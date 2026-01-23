import { Router } from "express";
import { CreateCategoryController } from "../../controllers/create/createCategoryController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const createCategoryRoutes = Router();
const createCategoryController = new CreateCategoryController();

createCategoryRoutes.post("/category",authMiddleware,  (req, res) => createCategoryController.handle(req as any, res));