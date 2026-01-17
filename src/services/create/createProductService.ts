import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class createProductService{

    async execute(data:any){
        
        const existingProduct = await prisma.product.findFirst({
            where:{
                name: data.name,}
        });
        if(existingProduct){
            throw new AppError("Product already exists");
        }
        
        const product = await prisma.product.create({
            data:{
                name: data.name,
                volume: data.volume,
                unitPrice: data.unitPrice,
                categoryId: data.categoryId,
                createdById: data.createdById,
                updatedById: data.updatedById,
                availableUnit: data.availableUnit,
                availableBundle: data.availableBundle,
                availableBox: data.availableBox,
                availableOther: data.availableOther,
                unitsPerBundle: data.unitsPerBundle,
                unitsPerBox: data.unitsPerBox,
                unitsPerOther: data.unitsPerOther,
            }
        })
        return product;
    }
}