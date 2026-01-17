import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class DeleteCategoryService{
    async execute(id:string){
        const categoryExists = await prisma.category.findUnique({
            where:{
                id
            }
        })
        if(!categoryExists){
            throw new AppError("Categoria não encontrada")
        }
        await prisma.category.delete({
            where:{
                id
            }
        })
        return

    }
}