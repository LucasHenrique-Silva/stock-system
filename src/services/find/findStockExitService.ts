import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";
import { StockExitType } from "../../generated/prisma";

export class FindStockExitService {
  async execute(id: string) {
    const stockExit = await prisma.stockExit.findUnique({
      where: { id },
    });
    if (!stockExit) {
        throw new AppError("Stock exit not found", 404);
    }
    return stockExit;
  }
  async executeByType(type: StockExitType) {
    return prisma.stockExit.findMany({
      where: { type },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
 async executeAll() {
    const stockExits = await prisma.stockExit.findMany();
    return stockExits;
  }

}