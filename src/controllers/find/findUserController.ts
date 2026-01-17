import { Request, Response } from "express";
import { FindUserService } from "../../services/find/findUserService";

export class FindClientController {
    async findAllUsers(req: Request, res: Response) {

        const findUserService = new FindUserService();
        const users = await findUserService.findAll();

        return res.json(users);
    }
    async findUserByEmail(req: Request, res: Response) {
        const { email } = req.params;
        const findUserService = new FindUserService();
        const user = await findUserService.findByEmail(email);
        if (user === null) {
            return res.status(404).json({ message: "Usuario não encontrado" });
        }
        return res.json(user);
    }

    async findUserById(req: Request, res: Response) {
        const { id } = req.params;
        const findUserService = new FindUserService();
        const user = await findUserService.findById(id);
        if (user === null) {
            return res.status(404).json({ message: "Usuario não encontrado" });
        }
        return res.json(user);
    }
    async findUserByName(req: Request, res: Response) {
        const { name } = req.params;
        const findUserService = new FindUserService();
        const users = await findUserService.findByName(name);
        return res.json(users);
    }
    async findUserByRole(req: Request, res: Response) {
        const { role } = req.params;
        const findUserService = new FindUserService();
        const users = await findUserService.findByRole(role);
        return res.json(users);
    }
}