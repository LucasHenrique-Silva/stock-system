import { Router } from "express";
import { FindProductController } from "../../controllers/find/findProductController";

export const findProductRoutes = Router();
const findProductController = new FindProductController();
findProductRoutes.get("/products/all", findProductController.handle);
findProductRoutes.get("/products/id/:id", findProductController.findProductById);
findProductRoutes.get("/products/name/:name", findProductController.findProductByName);

findProductRoutes.get("/products/category/:category", findProductController.findProductByCategory);
