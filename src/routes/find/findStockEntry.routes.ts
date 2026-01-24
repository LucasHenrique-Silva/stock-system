import { Router } from "express";
import { FindStockEntryController } from "../../controllers/find/findStockEntryController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const findStockEntryRoutes = Router();
const findStockEntryController = new FindStockEntryController();

findStockEntryRoutes.get("/", authMiddleware, (req, res)=> findStockEntryController.findAll(req as any, res));
findStockEntryRoutes.get("/id/:id", authMiddleware, (req, res)=> findStockEntryController.findById(req as any, res));
findStockEntryRoutes.get("/product/:productId", authMiddleware, (req, res)=> findStockEntryController.findByProductId(req as any, res));
findStockEntryRoutes.get("/date-range", authMiddleware, (req, res)=> findStockEntryController.findByDateRange(req as any, res));