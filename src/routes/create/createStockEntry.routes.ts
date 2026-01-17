import { Router } from "express";
import { CreateStockEntryController } from "../../controllers/create/createStockEntryController";

export const createStockEntryRoutes = Router();
const createStockEntryController = new CreateStockEntryController();

createStockEntryRoutes.post("/stock-entry", (req, res) =>
  createStockEntryController.handle(req, res)
);