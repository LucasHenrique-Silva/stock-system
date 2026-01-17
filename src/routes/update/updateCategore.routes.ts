import { Router } from "express";
import { UpdateCategoryController } from "../../controllers/update/updateCategoryController";

export const updateCategoryRoutes = Router();
const updateCategory = new UpdateCategoryController();

updateCategoryRoutes.put("/category/:id", updateCategory.handle.bind(updateCategory));

