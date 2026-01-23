import { Router } from "express";
import { DeleteUserController } from "../../controllers/delete/deleteUserController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const deleteUserRoutes = Router();
const deleteUserController = new DeleteUserController();

deleteUserRoutes.delete("/users/:id", authMiddleware,  (req, res) => deleteUserController.handle(req as any, res));
