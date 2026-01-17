import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/update/updateCategoryServices";

export class UpdateCategoryController{
    async handle(req: Request, res: Response){
        const {id} = req.params
        const {name} = req.body
        const updateService = new UpdateCategoryService()
        const category = await updateService.execute(id, name)
        return res.json({category})
    }
}