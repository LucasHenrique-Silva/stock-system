import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

interface CreateStockEntryDTO {
  type: "COMPRA" | "AJUSTE" | "DEVOLUCAO";
  notes?: string;
  createdById: string;
  items: {
    productId: string;
    quantity: number;
    unitCost?: number;
    lotNumber?: string;
    expiresAt?: Date;
  }[];
}


export class CreateStockEntryService {
  async execute(data: CreateStockEntryDTO) {

    if (data.type === "AJUSTE") {
  const hasUnitCost = data.items.some(item => item.unitCost !== undefined);
  if (hasUnitCost) {
    throw new AppError("unitCost is not allowed for AJUSTE entries");
  }
}

if (data.type === "COMPRA") {
  const missingUnitCost = data.items.some(item => item.unitCost === undefined);
  if (missingUnitCost) {
    throw new AppError("unitCost is required for COMPRA entries");
  }
}


    if (!data.items.length) {
      throw new AppError("Stock entry must have at least one item");
    }

    const userExists = await prisma.user.findUnique({
      where: { id: data.createdById },
    });
    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    const productIds = data.items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    if (products.length !== productIds.length) {
      throw new AppError("One or more products not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      const entry = await tx.stockEntry.create({
        data: {
          type: data.type,
          notes: data.notes,
          createdById: data.createdById,
          items: {
            create: data.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              unitCost: item.unitCost,
              lotNumber: item.lotNumber,
              expiresAt: item.expiresAt,
            })),
          },
        },
      });

      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            unitsInStock: { increment: item.quantity },
          },
        });
      }

      return entry;
    });
  }
}

