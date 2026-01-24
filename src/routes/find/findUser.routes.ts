import { Router } from "express";
import { FindClientController } from "../../controllers/find/findUserController";
import { authMiddleware } from "../../middleware/authMiddleware";


export const findUserRoutes = Router();
const controller = new FindClientController();

findUserRoutes.get("/all",authMiddleware, (req,res) => controller.findAllUsers(req as any, res));
findUserRoutes.get("/email/:email",authMiddleware, (req,res) => controller.findUserByEmail(req as any, res));
findUserRoutes.get("/id/:id",authMiddleware, (req,res) => controller.findUserById(req as any, res));
findUserRoutes.get("/name/:name",authMiddleware, (req,res) => controller.findUserByName(req as any, res));
findUserRoutes.get("/role/:role",authMiddleware, (req,res) => controller.findUserByRole(req as any, res));