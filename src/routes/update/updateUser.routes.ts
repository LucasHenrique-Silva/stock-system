import { Router } from "express";
import { UpdateUserController } from "../../controllers/update/updateUserController";

export const updateUserRoutes = Router();
const updateUserController = new UpdateUserController();

updateUserRoutes.put(
  "/users/:id",
  updateUserController.handle.bind(updateUserController)
);
