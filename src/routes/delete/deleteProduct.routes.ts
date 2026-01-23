import { Router } from "express";
import { DeleteProductController } from "../../controllers/delete/deleteProductController";
import { authMiddleware } from "../../middleware/authMiddleware";

const deleteProductRoutes = Router();
const deleteProductController = new DeleteProductController();

deleteProductRoutes.delete("/products/:id", authMiddleware,  (req, res) => deleteProductController.handle(req as any, res));

export { deleteProductRoutes };