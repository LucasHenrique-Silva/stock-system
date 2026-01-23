import { Router } from "express";
import { CreateStockEntryController } from "../../controllers/create/createStockEntryController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const createStockEntryRoutes = Router();
const createStockEntryController = new CreateStockEntryController();

createStockEntryRoutes.post("/stock-entry",authMiddleware,  (req, res) => createStockEntryController.handle(req as any, res)
);