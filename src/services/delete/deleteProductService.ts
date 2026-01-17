import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class DeleteProductService {
  async execute(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    }); 
    if (!product) {
      throw new AppError("Produto não encontrado");
    }
    await prisma.product.delete({
      where: { id },
    });
    return;
  }
}