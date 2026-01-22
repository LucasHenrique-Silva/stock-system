import { CreateUserController } from "../../controllers/create/createUserController";
import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

export const createUserRoutes = Router();
const controller = new CreateUserController();

// rota protegida
createUserRoutes.post(
  "/user",
  authMiddleware, // ✅ middleware adiciona userId
  (req, res) => controller.handle(req as any, res) // opcional: forçar tipo temporariamente
);
