import { Router } from "express";
import { createProductController } from "../../controllers/create/createProductController";


export const createProductRoutes = Router();
const controller = new createProductController();

createProductRoutes.post("/product", controller.handle.bind(controller));



export default createProductRoutes;