import { Router } from "express";
import { FindProductBarCodeController } from "../../controllers/find/findProductBarCodeController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const findProductBarcodeRoutes = Router();
const findProductBarCodeController = new FindProductBarCodeController();

findProductBarcodeRoutes.get("/productBarcode/barcode/:barCode",authMiddleware, (req, res)=> findProductBarCodeController.findByBarcode(req as any, res));
findProductBarcodeRoutes.get("/productBarcode/id/:id",authMiddleware, (req, res)=> findProductBarCodeController.findById(req as any, res));
findProductBarcodeRoutes.get("/productBarcodes",authMiddleware, (req, res)=> findProductBarCodeController.findAll(req as any, res));