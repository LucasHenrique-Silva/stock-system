import { prisma } from "../../config/prisma";

export class FindCategoryServices{
    async findAll(){
        const categories = await prisma.category.findMany()
        return categories
    }
    async findByName(name: string){
        const category = await prisma.category.findFirst({where:{name}})
        return category
    }
    async findById(id: string){
        const category = await prisma.category.findUnique({where:{id}})
        return category
    }
}