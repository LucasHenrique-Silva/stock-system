import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class DeleteProductBarCodeService {
    async execute(id: string) {
        const findProductBarcode = await prisma.productBarcode.findUnique({
            where: {
                id: id,
            },
        });
        if (!findProductBarcode) {
            throw new AppError("Product barcode not found");
        }
        const deletedProductBarcode = await prisma.productBarcode.delete({
            where: {
                id: id,
            },
        });
        return deletedProductBarcode;
    }
}