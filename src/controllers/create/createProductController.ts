import { Request, Response } from "express";
import { createProductService } from "../../services/create/createProductService";
import { createProductSchema } from "../../validators/productDTO";

export class createProductController {
  async handle(req: Request, res: Response) {
    const parsed = createProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Dados inválidos",
          errors: parsed.error.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message
        })),
      });
    }

    const service = new createProductService();
    const product = await service.execute(parsed.data);

    return res.status(201).json(product);
  }
}
