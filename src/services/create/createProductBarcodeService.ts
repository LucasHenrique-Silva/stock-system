import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

interface ProductBarcodeRequest {
    barcode: string;
    productId: string;
}

export class createProductBarcodeService {
    async execute(data: ProductBarcodeRequest){
        const productBarcodeExists = await prisma.productBarcode.findFirst({
            where:{
                barcode: data.barcode,
            }
        })
        if(productBarcodeExists){
            throw new AppError("Barcode already exists");
        }
        const productExists = await prisma.product.findFirst({
            where:{
                id: data.productId,
            }
        })
        if(!productExists){
            throw new AppError("Product does not exist");
        }
        const productBarcode = await prisma.productBarcode.create({
            data:{
                barcode: data.barcode,
                productId: data.productId,
            }
        })
        return productBarcode;
    }
}