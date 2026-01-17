import { Router } from "express";
import { FindClientController } from "../../controllers/find/findUserController";


export const findUserRoutes = Router();
const controller = new FindClientController();

findUserRoutes.get("/all", controller.findAllUsers);
findUserRoutes.get("/email/:email", controller.findUserByEmail);
findUserRoutes.get("/id/:id", controller.findUserById);
findUserRoutes.get("/name/:name", controller.findUserByName);
findUserRoutes.get("/role/:role", controller.findUserByRole);
