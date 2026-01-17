import { Router } from "express";
import { DeleteProductController } from "../../controllers/delete/deleteProductController";

const deleteProductRoutes = Router();
const deleteProductController = new DeleteProductController();

deleteProductRoutes.delete("/products/:id", deleteProductController.handle);

export { deleteProductRoutes };