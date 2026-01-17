import { Router } from "express";
import { CreateCategoryController } from "../../controllers/create/createCategoryController";

export const createCategoryRoutes = Router();
const createCategoryController = new CreateCategoryController();

createCategoryRoutes.post("/category", createCategoryController.handle.bind(createCategoryController));