import { Request, Response } from "express";
import { FindStockExitService } from "../../services/find/findStockExitService";
import { StockExitType } from "../../generated/prisma";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";


const findStockExitService = new FindStockExitService();
export class FindStockExitController {
    async findAll(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
        const stockExits = await findStockExitService.executeAll();
        return res.json(stockExits);
    }
    async findById(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
        const { id } = req.params;
        const stockExit = await findStockExitService.execute(id);
        return res.json(stockExit);
    }
     async findByType(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
    const  type  = req.params.type.toLocaleUpperCase();

    if (!Object.values(StockExitType).includes(type as StockExitType)) {
      throw new AppError("Tipo de saída inválido", 400);
    }

    const stockExits = await findStockExitService.executeByType(
      type as StockExitType
    );

    return res.json(stockExits);
  }
    async findByDateRange(req: AuthenticatedRequest, res: Response) {
          if(req.role == UserRole.FUNCIONARIO){
              throw new AppError("Unauthorized", 403);
          }
          const { startDate, endDate } = req.query;
          if (!startDate || !endDate) {
              throw new AppError("startDate and endDate are required", 400);
          }
  
          const start = new Date(startDate as string);
          const end = new Date(endDate as string);
  
          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
              throw new AppError("Invalid date format", 400);
          }
  
          if (start > end) {
              throw new AppError("startDate cannot be greater than endDate", 400);
          }
  
         
  
          const stockEntries = await findStockExitService.findByDateRange(start, end);
  
          return res.json(stockEntries);
  }
}