import { Router } from "express";
import { WeeklyFinancialReportController } from "../../controllers/reports/weeklyFinancialReportController";

export const weeklyFinancialReportRoutes = Router();
const controller = new WeeklyFinancialReportController();

weeklyFinancialReportRoutes.get("/weekly", controller.handle.bind(controller));