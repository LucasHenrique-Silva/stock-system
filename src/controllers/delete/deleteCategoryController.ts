import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/delete/deleteCategoryService";

export class DeleteCategoryController{
    async handle(req: Request, res: Response){
        const {id} = req.params
        const deleteService = new DeleteCategoryService()
        const category = await deleteService.execute(id)
        return res.send("Deletado com sucesso")
    }
}