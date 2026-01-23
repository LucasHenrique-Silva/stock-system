import { Router } from "express";
import {DeleteCategoryController } from "../../controllers/delete/deleteCategoryController";
import { authMiddleware } from "../../middleware/authMiddleware";

const deleteCategoryRoutes = Router();
const deleteCategoryController = new DeleteCategoryController();

deleteCategoryRoutes.delete("/category/:id",authMiddleware,  (req, res) => deleteCategoryController.handle(req as any, res));

export { deleteCategoryRoutes };