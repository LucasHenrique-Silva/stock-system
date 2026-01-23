import { Router } from "express";
import { DeleteProductBarcodeController } from "../../controllers/delete/deleteProductBarcodeController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const deleteProductBarCodeRoutes = Router();
const deleteProductBarcodeController = new DeleteProductBarcodeController();

deleteProductBarCodeRoutes.delete("/productBarcode/:id",authMiddleware,  (req, res) =>  deleteProductBarcodeController.handle(req as any, res));