import { Router } from "express";
import { createProductController } from "../../controllers/create/createProductController";
import { authMiddleware } from "../../middleware/authMiddleware";


export const createProductRoutes = Router();
const controller = new createProductController();

createProductRoutes.post("/product", authMiddleware,  (req, res) => controller.handle(req as any, res));



export default createProductRoutes;