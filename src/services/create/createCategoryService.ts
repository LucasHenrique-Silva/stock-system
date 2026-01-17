import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";



export class CreateCategoryService {

    async execute(name: string) {
          
        const categoryExists = await prisma.category.findUnique({
            where: {
                name: name
            }
        });
        if (categoryExists) {
            throw new AppError("Category already exists");
        }
        const category = await prisma.category.create({
            data: {
                name
            }
        });
        return category;
    }
}