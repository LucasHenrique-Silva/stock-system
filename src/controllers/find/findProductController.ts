import { FindProductServices } from "../../services/find/findProductServices";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/expressRequest";

export class FindProductController {
  async handle(req: AuthenticatedRequest, res: Response) {
    const service = new FindProductServices();
    const products = await service.findAll();

  
    return res.json(products);
  }
  async findProductById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const service = new FindProductServices();
    const product = await service.findById(id);
    return res.json(product);
  }
  async findProductByName(req: AuthenticatedRequest, res: Response) {
    const { name } = req.params;
    const service = new FindProductServices();
    const products = await service.findByName(name);
    return res.json(products);
  }
 
  async findProductByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const service = new FindProductServices();
    const products = await service.findByCategory(category);
    return res.json(products);
  }
}
