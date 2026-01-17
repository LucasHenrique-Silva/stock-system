import { Router } from "express";
import { CreateProductBarcodeController } from "../../controllers/create/createProductBarcodeController";

export const createProductRoutesBarcode = Router();
const controller = new CreateProductBarcodeController();

createProductRoutesBarcode.post("/productBarcode", controller.handle.bind(controller));
