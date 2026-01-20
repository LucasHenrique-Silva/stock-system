// src/controllers/report/financialReportController.ts
import { Request, Response } from "express";
import { FinancialReportService } from "../../services/reports/FinancialReportService";
import { AppError } from "../../errors/AppError";

// src/services/report/ReportPeriod.ts
export enum ReportPeriod {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  SEMESTER = "SEMESTER",
  YEAR = "YEAR",
}


export class FinancialReportController {
  async handle(req: Request, res: Response) {
    const { date, period, view } = req.query;

    if (!date) {
      throw new AppError("Data obrigatória", 400);
    }

    const reportPeriod = String(period || "DAY").toUpperCase();

    if (!Object.values(ReportPeriod).includes(reportPeriod as ReportPeriod)) {
      throw new AppError("Período inválido", 400);
    }

    const service = new FinancialReportService();
    const report = await service.execute(
      String(date),
      reportPeriod as ReportPeriod
    );

    // VISÃO RESUMIDA
    if (view === "summary") {
      return res.json({
        period: {
          startDate: report.startDate,
          endDate: report.endDate,
        },
        total: report.profit,
        revenue: report.revenue,
        cost: report.cost,
        result: report.result,
      });
    }

    // VISÃO DETALHADA (default)
    return res.json({
      period: {
        startDate: report.startDate,
        endDate: report.endDate,
      },
      revenue: {
        total: report.revenue,
      },
      cost: {
        total: report.cost,
      },
      profit: report.profit,
      result: report.result,
    });
  }
}
