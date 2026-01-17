import { Request, Response } from "express";
import { createUserSchema } from "../../validators/userDTO";
import { CreateUserService } from "../../services/create/createUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
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
