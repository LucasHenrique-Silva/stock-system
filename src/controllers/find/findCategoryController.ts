import { Request, Response } from "express";
import { FindCategoryServices } from "../../services/find/findCategoryServices";

const services = new FindCategoryServices

export class FindCategoryController{
    async findAll(req: Request, res: Response){
        const categories = await services.findAll()
        return res.json({categories})
    }
    async findById(req: Request, res: Response){
        const {id} = req.params
        const category = await services.findById(id)
        return res.json({category})
    }
    async findByName(req: Request, res: Response){
        const {name} = req.params
        const category = await services.findByName(name)
        return res.json({category})
    }
}