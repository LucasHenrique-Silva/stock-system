import { Response } from "express";
import { CreateStockEntryService } from "../../services/create/createStockEntryService";
import { stockEntrySchema } from "../../validators/stockEntryDTO";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";

export class CreateStockEntryController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const parsed = stockEntrySchema.parse(req.body);
    if(req.role == UserRole.FUNCIONARIO){
      throw new AppError("Acesso negado", 403);
    }
    const createService = new CreateStockEntryService();
    const stockEntry = await createService.execute(parsed);

    return res.status(201).json(stockEntry);
  }
}
