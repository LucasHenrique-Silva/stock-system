import { Request, Response } from "express";
import { FindStockExitService } from "../../services/find/findStockExitService";
import { StockExitType } from "../../generated/prisma";
import { AppError } from "../../errors/AppError";


const findStockExitService = new FindStockExitService();
export class FindStockExitController {
    async findAll(req: Request, res: Response) {
        const stockExits = await findStockExitService.executeAll();
        return res.json(stockExits);
    }
    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const stockExit = await findStockExitService.execute(id);
        return res.json(stockExit);
    }
     async findByType(req: Request, res: Response) {
    const  type  = req.params.type.toLocaleUpperCase();

    if (!Object.values(StockExitType).includes(type as StockExitType)) {
      throw new AppError("Tipo de saída inválido", 400);
    }

    const stockExits = await findStockExitService.executeByType(
      type as StockExitType
    );

    return res.json(stockExits);
  }
}