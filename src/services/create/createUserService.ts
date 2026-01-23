import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcryptjs";

interface CreateUserDTO {
  name: string;
  email: string;
  role: any;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, role, password }: CreateUserDTO) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new AppError("Email já cadastrado", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
      
      
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }
}
