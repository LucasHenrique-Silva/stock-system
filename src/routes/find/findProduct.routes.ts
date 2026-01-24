import { Router } from "express";
import { FindProductController } from "../../controllers/find/findProductController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const findProductRoutes = Router();
const findProductController = new FindProductController();
findProductRoutes.get("/products/all",authMiddleware, (req, res)=> findProductController.handle(req as any, res));
findProductRoutes.get("/products/id/:id", authMiddleware, (req, res)=> findProductController.findProductById(req as any, res));
findProductRoutes.get("/products/name/:name", authMiddleware, (req, res)=> findProductController.findProductByName(req as any, res));

findProductRoutes.get("/products/category/:category", findProductController.findProductByCategory);
    