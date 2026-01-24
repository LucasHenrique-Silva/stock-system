import { Router } from "express";
import { FindCategoryController } from "../../controllers/find/findCategoryController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const findCategoryRoute = Router()
const findCategoryController = new FindCategoryController()

findCategoryRoute.get("/category/all",authMiddleware,  (req, res) => findCategoryController.findAll(req as any, res))
findCategoryRoute.get("/category/id/:id", authMiddleware, (req, res) => findCategoryController.findById(req as any, res))
findCategoryRoute.get("/category/name/:name", authMiddleware, (req, res) => findCategoryController.findByName(req as any, res))