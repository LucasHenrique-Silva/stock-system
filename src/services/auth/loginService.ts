import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";


const rawSecret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!rawSecret) {
  throw new Error("JWT_SECRET não definido. Configuração de segurança falhou!");
}

const JWT_SECRET: Secret = rawSecret; 

export class LoginService{
    async execute(email: string, password: string) {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!userExists){
            throw new AppError("Usuário ou senha inválidos", 401)
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if(!passwordMatch){
            throw new AppError("Usuário ou senha inválidos", 401)
        }

         const token = jwt.sign(
  { userId: userExists.id,
    role: userExists.role
   },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN } as SignOptions
);

       return {
      token,
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
    };
  }
    }
