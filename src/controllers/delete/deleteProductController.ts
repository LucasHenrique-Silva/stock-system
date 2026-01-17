import {Request, Response } from "express";
import { DeleteProductService } from "../../services/delete/deleteProductService";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute(id);
    return res.status(204).send();
  }
}
