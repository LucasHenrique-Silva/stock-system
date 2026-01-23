import { Response } from "express";
import { DeleteUserService } from "../../services/delete/deleteUserService";
import { UserRole } from "@prisma/client";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { AppError } from "../../errors/AppError";

export class DeleteUserController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    if( req.role !== UserRole.ADMINISTRADOR){
            throw new AppError("Acesso negado", 403)
        }
    const service = new DeleteUserService();
    await service.execute(id);

    return res.status(204).send();
  }
}
