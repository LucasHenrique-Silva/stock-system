import { Request, Response } from "express";
import { UpdateProductService } from "../../services/update/updateProductService";

export class UpdateProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        const updateProductService = new UpdateProductService();
        const updatedProduct = await updateProductService.execute(id, data);

        return res.json(updatedProduct);
    }
}