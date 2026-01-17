import { Router } from "express";
import { DeleteProductBarcodeController } from "../../controllers/delete/deleteProductBarcodeController";

export const deleteProductBarCodeRoutes = Router();
const deleteProductBarcodeController = new DeleteProductBarcodeController();

deleteProductBarCodeRoutes.delete("/productBarcode/:id", deleteProductBarcodeController.handle);