import { Router } from "express";
import { DeleteUserController } from "../../controllers/delete/deleteUserController";

export const deleteUserRoutes = Router();
const deleteUserController = new DeleteUserController();

deleteUserRoutes.delete("/users/:id", deleteUserController.handle);
