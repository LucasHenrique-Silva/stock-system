import { Router } from "express";
import { UpdateProductBarcodeController } from "../../controllers/update/updateProductBarcodeController";

export const updateProductBarcodeRoutes = Router();
const updateProductBarcodeController = new UpdateProductBarcodeController();
updateProductBarcodeRoutes.put("/productBarcode/:id", updateProductBarcodeController.handle.bind(updateProductBarcodeController));