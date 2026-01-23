import { Response } from "express";
import { DeleteProductService } from "../../services/delete/deleteProductService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";

export class DeleteProductController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    if( req.role !== UserRole.ADMINISTRADOR){
            throw new AppError("Acesso negado", 403)
        }
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute(id);
    return res.status(204).send();
  }
}
