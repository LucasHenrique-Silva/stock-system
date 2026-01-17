import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: boolean;
}

export class UpdateUserService {
  async execute(id: string, data: UpdateUserDTO) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Impede remover o último ADMIN
    if (
      user.role === UserRole.ADMINISTRADOR &&
      data.role &&
      data.role !== UserRole.ADMINISTRADOR
    ) {
      const adminCount = await prisma.user.count({
        where: { role: UserRole.ADMINISTRADOR },
      });

      if (adminCount <= 1) {
        throw new AppError(
          "Não é permitido remover o último administrador",
          400
        );
      }
    }

    // Hash da senha
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
       
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }
}
