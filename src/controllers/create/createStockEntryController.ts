import { Request, Response } from "express";
import { CreateStockEntryService } from "../../services/create/createStockEntryService";
import { stockEntrySchema } from "../../validators/stockEntryDTO";

export class CreateStockEntryController {
  async handle(req: Request, res: Response) {
    const parsed = stockEntrySchema.parse(req.body);

    const createService = new CreateStockEntryService();
    const stockEntry = await createService.execute(parsed);

    return res.status(201).json(stockEntry);
  }
}
