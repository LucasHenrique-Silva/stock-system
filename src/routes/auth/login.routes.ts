import { Router } from "express";
import { LoginController } from "../../controllers/auth/loginController";

const authRoutes = Router();
const loginController = new LoginController();

authRoutes.post("/login", loginController.handle.bind(loginController));

export { authRoutes };
