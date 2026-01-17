import { z } from "zod";

export const stockEntrySchema = z.object({
  type: z.enum(["COMPRA", "AJUSTE", "DEVOLUCAO"]),
  notes: z.string().optional(),
  createdById: z.string().cuid(),

  items: z.array(
    z.object({
      productId: z.string().cuid(),
      quantity: z.coerce.number().int().positive(),
      unitCost: z.coerce.number().positive().optional(),
      lotNumber: z.string().optional(),
      expiresAt: z.preprocess(
        (val) => (val ? new Date(val as string) : undefined),
        z.date().optional()
      ),
    })
  ).min(1),
});
