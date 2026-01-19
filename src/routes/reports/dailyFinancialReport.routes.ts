import { Router } from "express";
import { DailyFinancialReportController } from "../../controllers/reports/dailyFinancialReportController";

export const dailyFinancialReportRoutes = Router();
const controller = new DailyFinancialReportController();

dailyFinancialReportRoutes.get("/daily", controller.handle.bind(controller));

