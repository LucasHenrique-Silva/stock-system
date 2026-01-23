import { Response } from "express";
import { AuthenticatedRequest } from "../../types/expressRequest";
import { createUserSchema } from "../../validators/userDTO";
import { CreateUserService } from "../../services/create/createUserService";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError";

export class CreateUserController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const role = req.role; // TypeScript reconhece
    if(role !== UserRole.ADMINISTRADOR){
      throw new AppError("Acesso negado", 403);
    }
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: parsed.error.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const service = new CreateUserService();
    const user = await service.execute(parsed.data);

    return res.status(201).json(user);
  }
}
