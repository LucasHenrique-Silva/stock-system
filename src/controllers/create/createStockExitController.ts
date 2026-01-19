// src/controllers/create/createStockExitController.ts
import { Request, Response } from "express";
import { createStockExitSchema } from "../../validators/stockExitDTO";
import { CreateStockExitService } from "../../services/create/createStockExitService";

export class CreateStockExitController {
  async handle(req: Request, res: Response) {
    const parsed = createStockExitSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: true,
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const service = new CreateStockExitService();
    const result = await service.execute(parsed.data);

    return res.status(201).json(result);
  }
}
