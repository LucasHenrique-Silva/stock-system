// src/routes/create/createStockExit.routes.ts
import { Router } from "express";
import { CreateStockExitController } from "../../controllers/create/createStockExitController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const createStockExitRoutes = Router();
const controller = new CreateStockExitController();

createStockExitRoutes.post("/stock-exit",authMiddleware,  (req, res) => controller.handle(req as any, res));
