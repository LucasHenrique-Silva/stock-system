import { Request, Response } from "express";
import { DeleteProductBarCodeService } from "../../services/delete/deleteProductBarCodeService";

export class DeleteProductBarcodeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const deleteProductBarCodeService = new DeleteProductBarCodeService();
        const deletedProductBarCode = await deleteProductBarCodeService.execute(id);
        return res.json(deletedProductBarCode);
    }
}