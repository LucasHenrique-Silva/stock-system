import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

interface UpdateProductBarcodeRequest {
    barcode: string;
    productId: string;
}

export class UpdateProductBarcodeService {
    async execute(id: string, data: UpdateProductBarcodeRequest) {
        
        const existingBarcode = await prisma.productBarcode.findUnique({
            where: { barcode: data.barcode },
        });
        if (existingBarcode && existingBarcode.id !== id) {
            throw new AppError("Barcode already in use");
        }
        const productExists = await prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!productExists) {
            throw new AppError("Associated product does not exist");
        }
        const productBarcodeExists = await prisma.productBarcode.findUnique({
            where: { id },
        });
        if (!productBarcodeExists) {
            throw new AppError("Product barcode ID not found");
        }
        const productBarcode = await prisma.productBarcode.update({
            where: { id },
            data: { barcode: data.barcode, productId: data.productId },
        });
        return productBarcode;
    }
}