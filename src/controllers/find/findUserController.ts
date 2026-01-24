import { Request, Response } from "express";
import { FindUserService } from "../../services/find/findUserService";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { AppError } from "../../errors/AppError";
import { UserRole } from "@prisma/client";

export class FindClientController {
    async findAllUsers(req: AuthenticatedRequest, res: Response) {
        if(req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Unauthorized", 403);
                }
        const findUserService = new FindUserService();
        const users = await findUserService.findAll();

        return res.json(users);
    }
    async findUserByEmail(req: AuthenticatedRequest, res: Response) {
        if(req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Unauthorized", 403);
                }
        const { email } = req.params;
        const findUserService = new FindUserService();
        const user = await findUserService.findByEmail(email);
        if (user === null) {
            return res.status(404).json({ message: "Usuario não encontrado" });
        }
        return res.json(user);
    }

    async findUserById(req: AuthenticatedRequest, res: Response) {
        if(req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Unauthorized", 403);
                }
        const { id } = req.params;
        const findUserService = new FindUserService();
        const user = await findUserService.findById(id);
        if (user === null) {
            return res.status(404).json({ message: "Usuario não encontrado" });
        }
        return res.json(user);
    }
    async findUserByName(req: AuthenticatedRequest, res: Response) {
        if(req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Unauthorized", 403);
                }
        const { name } = req.params;
        const findUserService = new FindUserService();
        const users = await findUserService.findByName(name);
        return res.json(users);
    }
    async findUserByRole(req: AuthenticatedRequest, res: Response) {
        if(req.role !== UserRole.ADMINISTRADOR){
                    throw new AppError("Unauthorized", 403);
                }
        const { role } = req.params;
        const findUserService = new FindUserService();
        const users = await findUserService.findByRole(role);
        return res.json(users);
    }
}