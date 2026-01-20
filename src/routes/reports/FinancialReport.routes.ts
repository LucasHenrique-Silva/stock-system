import { Router } from "express";
import { FinancialReportController } from "../../controllers/reports/FinancialReportController";

export const FinancialReportRoutes = Router();
const FinancialReport = new FinancialReportController();

FinancialReportRoutes.get("/", FinancialReport.handle.bind(FinancialReport));

