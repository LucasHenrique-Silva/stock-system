import { Response } from "express";
import { DeleteCategoryService } from "../../services/delete/deleteCategoryService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";

export class DeleteCategoryController{
    async handle(req: AuthenticatedRequest, res: Response){
        const {id} = req.params
        if( req.role !== UserRole.ADMINISTRADOR){
            throw new AppError("Acesso negado", 403)
        }
        const deleteService = new DeleteCategoryService()
        const category = await deleteService.execute(id)
        return res.send("Deletado com sucesso")
    }
}