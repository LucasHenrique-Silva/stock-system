import { ca } from "zod/v4/locales";
import { prisma } from "../../config/prisma";

export class FindProductServices {
  async findAll() {
    const products = await prisma.product.findMany({select: {
        name: true,
        unitsInStock: true,
        status: true,
        minunitsInStock: true,
       
    }
    });
    return products;
    }
    async findById(id: string) {
    const product = await prisma.product.findUnique({
        where: { id },
        
} );
    return product;
    }
    async findByName(name: string) {
    const products = await prisma.product.findMany({
        where: { name: { contains: name, mode: "insensitive" } },
    });
    return products;
    }
    
    async findByCategory(category: any) {
    const products = await prisma.product.findMany({
        where: { category: category },
    });
    return products;
    }
  }