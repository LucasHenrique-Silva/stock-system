// src/routes/create/createStockExit.routes.ts
import { Router } from "express";
import { CreateStockExitController } from "../../controllers/create/createStockExitController";

export const createStockExitRoutes = Router();
const controller = new CreateStockExitController();

createStockExitRoutes.post("/stock-exit", controller.handle);
