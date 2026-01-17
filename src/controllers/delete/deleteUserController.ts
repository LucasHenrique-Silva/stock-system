import { Request, Response } from "express";
import { DeleteUserService } from "../../services/delete/deleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteUserService();
    await service.execute(id);

    return res.status(204).send();
  }
}
