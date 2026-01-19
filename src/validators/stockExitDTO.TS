// src/validators/stockExitDTO.ts
import { z } from "zod";

export const stockExitItemSchema = z.object({
  barcode: z.string().min(1),
  saleType: z.enum(["UNIT", "BOX", "BUNDLE", "OTHER"]),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive().optional(), // obrigatório se VENDA
});

export const createStockExitSchema = z.object({
  type: z.enum(["VENDA", "PERDA", "VENCIMENTO", "AJUSTE"]),
  items: z.array(stockExitItemSchema).min(1),
  notes: z.string().optional(),
  createdById: z.string(),
});
