import { Request, Response } from "express";
import { FindCategoryServices } from "../../services/find/findCategoryServices";
import { AuthenticatedRequest } from "../../types/expressRequest";

const services = new FindCategoryServices

export class FindCategoryController{
    async findAll(req: AuthenticatedRequest, res: Response){
        const categories = await services.findAll()
        return res.json({categories})
    }
    async findById(req: AuthenticatedRequest, res: Response){
        const {id} = req.params
        const category = await services.findById(id)
        return res.json({category})
    }
    async findByName(req: AuthenticatedRequest, res: Response){
        const {name} = req.params
        const category = await services.findByName(name)
        return res.json({category})
    }
}