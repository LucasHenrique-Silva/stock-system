import { Response } from "express";
import { createProductBarcodeService } from "../../services/create/createProductBarcodeService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";
    

export class CreateProductBarcodeController {
    async handle(req: AuthenticatedRequest, res: Response) {
        const data = req.body;
        if(req.role == UserRole.FUNCIONARIO){
            throw new AppError("Acesso negado.")
        }
        const service = new createProductBarcodeService();
        

        const productBarcode = await service.execute(data);
        return res.status(201).json(productBarcode);
    }
}