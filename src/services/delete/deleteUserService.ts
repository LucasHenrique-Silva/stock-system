import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class DeleteUserService {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (user.role === "ADMINISTRADOR") {
      const adminCount = await prisma.user.count({
        where: { role: "ADMINISTRADOR" },
      });

      if (adminCount <= 1) {
        throw new AppError(
          "Não é permitido deletar o último administrador",
          400
        );
      }
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }
}
