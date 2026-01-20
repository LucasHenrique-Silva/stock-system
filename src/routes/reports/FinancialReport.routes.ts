import { Router } from "express";
import { DailyFinancialReportController } from "../../controllers/reports/dailyFinancialReportController";
import { WeeklyFinancialReportController } from "../../controllers/reports/weeklyFinancialReportController";
import { MonthlyFinancialReportController } from "../../controllers/reports/monthlyFinancialReportController";

export const FinancialReportRoutes = Router();
const daily = new DailyFinancialReportController();
const weekly = new WeeklyFinancialReportController();
const monthly = new MonthlyFinancialReportController();

FinancialReportRoutes.get("/daily", daily.handle.bind(daily));
FinancialReportRoutes.get("/weekly", weekly.handle.bind(weekly));
FinancialReportRoutes.get("/monthly", monthly.handle.bind(monthly));


