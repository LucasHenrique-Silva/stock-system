import { Request, Response } from "express";
import { FindStockEntryServices } from "../../services/find/findStockEntryServices";
import { AppError } from "../../errors/AppError";

export class FindStockEntryController {
    async findAll(req: Request, res: Response) {
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntries = await findStockEntryServices.findAll();
        return res.json(stockEntries);
    }
    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntry = await findStockEntryServices.findById(id);
        return res.json(stockEntry);
    }
    async findByProductId(req: Request, res: Response) {
        const { productId } = req.params;
        const findStockEntryServices = new FindStockEntryServices();
        const stockEntries = await findStockEntryServices.findByProductId(productId);
        return res.json(stockEntries);
    }
    async findByDateRange(req: Request, res: Response) {
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