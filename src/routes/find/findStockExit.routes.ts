import { Router } from "express";
import { FindStockExitController } from "../../controllers/find/findStockExitController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const findStockExitRoutes = Router();
const controller = new FindStockExitController();

findStockExitRoutes.get("/",authMiddleware, (req, res) => controller.findAll(req as any, res));
findStockExitRoutes.get("/id/:id",authMiddleware, (req, res) => controller.findById(req as any, res));
findStockExitRoutes.get("/type/:type",authMiddleware, (req, res) => controller.findByType(req as any, res));
findStockExitRoutes.get("/date-range",authMiddleware, (req, res) => controller.findByDateRange(req as any, res));