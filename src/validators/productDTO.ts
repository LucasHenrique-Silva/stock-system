import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z.string().min(1),
    

    status: z.boolean().default(true),

    
    volume: z.string().min(1),

    // =========================
    // PREÇO (sempre por UNIDADE)
    // =========================
    unitPrice: z.coerce.number().positive(),
   

    // =========================
    // ESTOQUE MÍNIMO (ALERTA)
    // =========================
    minunitsInStock: z.coerce.number().int().nonnegative().default(0),

    // =========================
    // DISPONIBILIDADE PARA VENDA
    // =========================
    availableUnit: z.boolean().default(true),

    availableBox: z.boolean().default(false),
    availableBundle: z.boolean().default(false),
    availableOther: z.boolean().default(false),

    // =========================
    // CONVERSÃO (SÓ SE DISPONÍVEL)
    // =========================
    unitsPerBox: z.coerce.number().int().positive().optional(),
    unitsPerBundle: z.coerce.number().int().positive().optional(),
    unitsPerOther: z.coerce.number().int().positive().optional(),

    // =========================
    
    lotNumber: z.string().min(1).optional(),

    categoryId: z.string().cuid().optional(),

    createdById: z.string().cuid(),
    updatedById: z.string().cuid().optional(),

    
  })
  .superRefine((data, ctx) => {
    // =========================
    // REGRAS DE CONSISTÊNCIA
    // =========================

    // BOX
    if (data.availableBox && !data.unitsPerBox) {
      ctx.addIssue({
        path: ["unitsPerBox"],
        message: "unitsPerBox é obrigatório quando availableBox=true",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.availableBox && data.unitsPerBox) {
      ctx.addIssue({
        path: ["unitsPerBox"],
        message: "unitsPerBox não deve ser informado se availableBox=false",
        code: z.ZodIssueCode.custom,
      });
    }

    // BUNDLE
    if (data.availableBundle && !data.unitsPerBundle) {
      ctx.addIssue({
        path: ["unitsPerBundle"],
        message: "unitsPerBundle é obrigatório quando availableBundle=true",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.availableBundle && data.unitsPerBundle) {
      ctx.addIssue({
        path: ["unitsPerBundle"],
        message: "unitsPerBundle não deve ser informado se availableBundle=false",
        code: z.ZodIssueCode.custom,
      });
    }

    // OTHER
    if (data.availableOther && !data.unitsPerOther) {
      ctx.addIssue({
        path: ["unitsPerOther"],
        message: "unitsPerOther é obrigatório quando availableOther=true",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.availableOther && data.unitsPerOther) {
      ctx.addIssue({
        path: ["unitsPerOther"],
        message: "unitsPerOther não deve ser informado se availableOther=false",
        code: z.ZodIssueCode.custom,
      });
    }
  });
