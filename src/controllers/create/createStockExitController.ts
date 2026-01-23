// src/controllers/create/createStockExitController.ts
import { Request, Response } from "express";
import { createStockExitSchema } from "../../validators/stockExitDTO";
import { CreateStockExitService } from "../../services/create/createStockExitService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";
import { StockExitType } from "../../generated/prisma";
import { AppError } from "../../errors/AppError";

export class CreateStockExitController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const parsed = createStockExitSchema.safeParse(req.body);
    if(req.role === UserRole.FUNCIONARIO && parsed.data?.type !== StockExitType.VENDA){
      throw new AppError("Funcionários só podem registrar saídas do tipo 'VENDA'", 403);
    }
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
