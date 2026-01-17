import { Router } from "express";
import {DeleteCategoryController } from "../../controllers/delete/deleteCategoryController";

const deleteCategoryRoutes = Router();
const deleteCategoryController = new DeleteCategoryController();

deleteCategoryRoutes.delete("/category/:id", deleteCategoryController.handle);

export { deleteCategoryRoutes };