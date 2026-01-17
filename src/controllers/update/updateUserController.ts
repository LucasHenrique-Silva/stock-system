import { Request, Response } from "express";
import { UpdateUserService } from "../../services/update/updateUserServices";
import { createUserSchema } from "../../validators/userDTO";



export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

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

    const service = new UpdateUserService();
    const updatedUser = await service.execute(id, parsed.data);

    return res.status(200).json(updatedUser);
  }
}
