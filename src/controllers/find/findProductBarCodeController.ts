import { findProductBarCodeService } from "../../services/find/findProductBarCodeService";
import { Request, Response } from "express";

export class FindProductBarCodeController {
    async findByBarcode(req: Request, res: Response) {
        const { barCode } = req.params;
        const findProductController = new findProductBarCodeService();
        const product = await findProductController.findByBarcode(barCode);
        return res.json(product);
    }   
    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const findProductController = new findProductBarCodeService();
        const product = await findProductController.findById(id);
        return res.json(product);
    }
    async findAll(req: Request, res: Response) {
        const findProductController = new findProductBarCodeService();
        const products = await findProductController.findAll();
        return res.json(products);
    }
}