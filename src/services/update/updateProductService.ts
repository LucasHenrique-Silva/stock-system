import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

interface CreateProductData {
  name: string;
  brand: string;

  barcode?: string;
  volume: string;

  unitPrice: number;
  unitCostPrice: number;

  expirationDate?: Date | string;
  lotNumber?: string;

  categoryId?: string;

  createdById: string;
  updatedById?: string;

  type: string;

  // =========================
  // DISPONIBILIDADE
  // =========================
  availableUnit: boolean;
  availableBox: boolean;
  availableBundle: boolean;
  availableOther: boolean;

  // =========================
  // CONVERSÃO
  // =========================
  unitsPerBox?: number;
  unitsPerBundle?: number;
  unitsPerOther?: number;

  // =========================
  // ESTOQUE FÍSICO
  // =========================
  unitsInStock: number;
  boxInStock: number;
  bundleInStock: number;
  otherInStock: number;

  // =========================
  // ESTOQUE MÍNIMO (ALERTA)
  // =========================
  minunitsInStock: number;
  minboxInStock: number;
  minbundleInStock: number;
  minotherInStock: number;
}



export class UpdateProductService {
  async execute(id: string, data: CreateProductData) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new AppError("Produto não encontrado");
    }
    const productNameExists = await prisma.product.findFirst({
      where:{
        name: data.name
      }
    })
    if(productNameExists){
      throw new AppError("Nome de produto ja cadastrado")
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
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
            },
    });
    return updatedProduct;
  }
}