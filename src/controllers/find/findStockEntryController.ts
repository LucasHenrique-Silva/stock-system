import { Request, Response } from "express";
import { FindStockEntryServices } from "../../services/find/findStockEntryServices";
import { AppError } from "../../errors/AppError";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";

export class FindStockEntryController {
    async findAll(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntries = await findStockEntryServices.findAll();
        return res.json(stockEntries);
    }
    async findById(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
        const { id } = req.params;
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntry = await findStockEntryServices.findById(id);
        return res.json(stockEntry);
    }
    async findByProductId(req: AuthenticatedRequest, res: Response) {
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Unauthorized", 403);
        }
        const { productId } = req.params;
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntries = await findStockEntryServices.findByProductId(productId);
        return res.json(stockEntries);
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

        const service = new FindStockEntryServices();

        const stockEntries = await service.findByDateRange(start, end);

        return res.json(stockEntries);
}

}