import { prisma } from "../../config/prisma";

export class FindStockEntryServices {
    async findAll() {
        const stockEntries = await prisma.stockEntry.findMany({
            orderBy: {
                createdAt: "desc",
            },include:{
                items: true
            }
        });
        return stockEntries;
    }
    async findById(id: string) {
        const stockEntry = await prisma.stockEntry.findUnique({
            where: { id },
        });
        return stockEntry;
    }
    async findByProductId(productId: string) {
        const stockEntries = await prisma.stockEntry.findMany({
            where: { items: { some: { productId } } },
            orderBy: {
                createdAt: "desc",
            },
        });
        return stockEntries;
    }
    async findByDateRange(startDate: Date, endDate: Date) {
  return prisma.stockEntry.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      createdBy: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

}