import { Request, Response } from "express";
import { DeleteProductBarCodeService } from "../../services/delete/deleteProductBarCodeService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { AppError } from "../../errors/AppError";
import { UserRole } from "@prisma/client";

export class DeleteProductBarcodeController {
    async handle(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        if( req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Acesso negado", 403)
                }
        const deleteProductBarCodeService = new DeleteProductBarCodeService();
        const deletedProductBarCode = await deleteProductBarCodeService.execute(id);
        return res.json(deletedProductBarCode);
    }
}