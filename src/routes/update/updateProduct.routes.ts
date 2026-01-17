import { Router } from "express";
import { UpdateProductController } from "../../controllers/update/updateProductController";

export const updateProductRoutes = Router();
const updateProductController = new UpdateProductController();

updateProductRoutes.put("/product/:id", updateProductController.handle.bind(updateProductController));

