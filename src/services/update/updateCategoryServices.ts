import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class UpdateCategoryService{
    async execute(id: string, name:string){
        const categoryExists = await prisma.category.findUnique({
            where:{
                id
            }
        })
        if(!categoryExists){
            throw new AppError("Id não encontrado")
        }
        const category = await prisma.category.update({
            data:{
                name
            },
            where:{
                id
            }
        })
        return category
    }
}