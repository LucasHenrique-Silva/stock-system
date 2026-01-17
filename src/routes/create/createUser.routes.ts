import { CreateUserController } from "../../controllers/create/createUserController";
import { Router } from "express";

export const createUserRoutes = Router();
const controller = new CreateUserController();

createUserRoutes.post("/user", (req, res) => controller.handle(req, res));

