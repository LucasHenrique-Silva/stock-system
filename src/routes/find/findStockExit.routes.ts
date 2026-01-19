import { Router } from "express";
import { FindStockExitController } from "../../controllers/find/findStockExitController";

export const findStockExitRoutes = Router();
const controller = new FindStockExitController();

findStockExitRoutes.get("/", controller.findAll.bind(controller));
findStockExitRoutes.get("/id/:id", controller.findById.bind(controller));
findStockExitRoutes.get("/type/:type", controller.findByType.bind(controller));