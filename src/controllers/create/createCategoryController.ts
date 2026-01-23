import { Response } from "express";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { CreateCategoryService } from "../../services/create/createCategoryService";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";
export class CreateCategoryController {
    async handle(req: AuthenticatedRequest, res: Response) {
        const {name} = req.body;
        const reqRole = req.role;
        if(reqRole == UserRole.FUNCIONARIO){ 
             throw new AppError("Acesso negado");
        }
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute(name);
        return res.status(201).json(category);
    }   
}
