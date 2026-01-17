import { Router } from "express";
import { FindStockEntryController } from "../../controllers/find/findStockEntryController";

export const findStockEntryRoutes = Router();
const findStockEntryController = new FindStockEntryController();

findStockEntryRoutes.get("/", findStockEntryController.findAll);
findStockEntryRoutes.get("/id/:id", findStockEntryController.findById);
findStockEntryRoutes.get("/product/:productId", findStockEntryController.findByProductId);
findStockEntryRoutes.get("/date-range", findStockEntryController.findByDateRange);
