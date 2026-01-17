import { Router } from "express";
import { FindCategoryController } from "../../controllers/find/findCategoryController";

export const findCategoryRoute = Router()
const findCategoryController = new FindCategoryController()

findCategoryRoute.get("/category/all", findCategoryController.findAll)
findCategoryRoute.get("/category/id/:id", findCategoryController.findById)
findCategoryRoute.get("/category/name/:name", findCategoryController.findByName)