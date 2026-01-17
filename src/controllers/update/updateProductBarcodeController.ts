import { Request, Response } from "express";
import { UpdateProductBarcodeService } from "../../services/update/updateProductBarcodeService";
import { AppError } from "../../errors/AppError";

export class UpdateProductBarcodeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        if (!data) {
            throw new AppError("Missing required fields");
        }
        console.log(data);
        const updateProductBarcodeService = new UpdateProductBarcodeService();
        const updatedProductBarcode = await updateProductBarcodeService.execute(id, data);
        return res.json(updatedProductBarcode);
    }
}