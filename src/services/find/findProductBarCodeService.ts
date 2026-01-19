import {prisma} from "../../config/prisma";

export class findProductBarCodeService {
    async findByBarcode(barcode: string) {
        const productBarcode = await prisma.productBarcode.findUnique({
            where: {
                barcode: barcode,
            },
            select: {
                id: true,
                barcode: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        unitPrice: true,
                        availableBox:true,
                        availableBundle:true,
                        availableUnit:true,
                        availableOther:true,
                        unitsPerBox:true,
                        unitsPerBundle:true,
                        unitsPerOther:true,}
                    ,
                },
            },

        });
        return productBarcode;
    }
    async findById(id: string) {
        const productBarcode = await prisma.productBarcode.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                barcode: true,
                product: {
                    select: {  
                        id: true,
                        name: true,
                        unitPrice: true,},
                },
            },
        });
        return productBarcode;
    }
    async findAll() {
        const productBarcodes = await prisma.productBarcode.findMany({
            select: {   
                id: true,
                barcode: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        unitPrice: true,
                    },
                },
            },
        });
        return productBarcodes;
    }
}