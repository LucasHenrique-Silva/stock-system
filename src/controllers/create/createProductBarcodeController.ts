import { Request, Response } from "express";
import { createProductBarcodeService } from "../../services/create/createProductBarcodeService";
    

export class CreateProductBarcodeController {
    async handle(req: Request, res: Response) {
        const data = req.body;
        
        const service = new createProductBarcodeService();
        

        const productBarcode = await service.execute(data);
        return res.status(201).json(productBarcode);
    }
}