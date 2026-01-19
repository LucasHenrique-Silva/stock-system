// src/services/create/createStockExitService.ts
import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";
import { Decimal } from "@prisma/client/runtime/client";

type SaleType = "UNIT" | "BOX" | "BUNDLE" | "OTHER";
type ExitType = "VENDA" | "PERDA" | "VENCIMENTO" | "AJUSTE";

interface StockExitItemInput {
  barcode: string;
  saleType: SaleType;
  quantity: number;
}

interface StockExitInput {
  type: ExitType;
  items: StockExitItemInput[];
  notes?: string;
  createdById: string;
}

export class CreateStockExitService {
  async execute(data: StockExitInput) {
    if (!data.items.length) {
      throw new AppError("Nenhum item informado");
    }

    const userExists = await prisma.user.findUnique({
      where: { id: data.createdById },
    });

    if (!userExists) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return prisma.$transaction(async (tx) => {
      let exitTotal = new Decimal(0);

      const stockExit = await tx.stockExit.create({
        data: {
          type: data.type,
          notes: data.notes,
          createdById: data.createdById,
          total: new Decimal(0), // será atualizado ao final
        },
      });

      for (const item of data.items) {
        const productBarcode = await tx.productBarcode.findUnique({
          where: { barcode: item.barcode },
          include: { product: true },
        });

        if (!productBarcode) {
          throw new AppError(`Produto não encontrado (${item.barcode})`, 404);
        }

        const product = productBarcode.product;

        let unitsRemoved = 0;

        switch (item.saleType) {
          case "UNIT":
            if (!product.availableUnit) throw new AppError("Unidade indisponível");
            unitsRemoved = item.quantity;
            break;

          case "BOX":
            if (!product.availableBox || !product.unitsPerBox)
              throw new AppError("Caixa indisponível");
            unitsRemoved = product.unitsPerBox * item.quantity;
            break;

          case "BUNDLE":
            if (!product.availableBundle || !product.unitsPerBundle)
              throw new AppError("Fardo indisponível");
            unitsRemoved = product.unitsPerBundle * item.quantity;
            break;

          case "OTHER":
            if (!product.availableOther || !product.unitsPerOther)
              throw new AppError("Formato indisponível");
            unitsRemoved = product.unitsPerOther * item.quantity;
            break;
        }

        if (unitsRemoved > product.unitsInStock) {
          throw new AppError(`Estoque insuficiente para ${product.name}`);
        }

        const unitPrice =
          data.type === "VENDA" ? product.unitPrice : new Decimal(0);

        const totalPrice = unitPrice.mul(unitsRemoved);
        exitTotal = exitTotal.add(totalPrice);
        console.log({ exitTotal });

        await tx.product.update({
          where: { id: product.id },
          data: {
            unitsInStock: { decrement: unitsRemoved },
          },
        });

        await tx.stockExitItem.create({
          data: {
            exitId: stockExit.id,
            productId: product.id,
            saleType: item.saleType,
            quantity: item.quantity,
            unitsRemoved,
            unitPrice,
            totalPrice,
          },
        });
      }

      await tx.stockExit.update({
        where: { id: stockExit.id },
        data: { total: exitTotal },
      });

      return stockExit;
    });
  }
}
