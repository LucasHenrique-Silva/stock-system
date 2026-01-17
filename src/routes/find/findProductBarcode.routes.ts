import { Router } from "express";
import { FindProductBarCodeController } from "../../controllers/find/findProductBarCodeController";

export const findProductBarcodeRoutes = Router();
const findProductBarCodeController = new FindProductBarCodeController();

findProductBarcodeRoutes.get("/productBarcode/barcode/:barCode", findProductBarCodeController.findByBarcode);
findProductBarcodeRoutes.get("/productBarcode/id/:id", findProductBarCodeController.findById);
findProductBarcodeRoutes.get("/productBarcodes", findProductBarCodeController.findAll);