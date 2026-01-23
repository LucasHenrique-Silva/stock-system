import { Router } from "express";
import { CreateProductBarcodeController } from "../../controllers/create/createProductBarcodeController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const createProductRoutesBarcode = Router();
const controller = new CreateProductBarcodeController();

createProductRoutesBarcode.post("/productBarcode", authMiddleware,  (req, res) => controller.handle(req as any, res));
