import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export class FindUserService {

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  async findByRole(role: Prisma.UserScalarFieldEnum | string) {
    return prisma.user.findMany({
      where: {
        role: role as any,
      },
    });
  }
}
