// src/controllers/report/dailyFinancialReportController.ts
import { Request, Response } from "express";
import { DailyFinancialReportService } from "../../services/reports/dailyFinancialReportService";

export class DailyFinancialReportController {
  async handle(req: Request, res: Response) {
    const { date, view } = req.query;

    const service = new DailyFinancialReportService();
    const report = await service.execute(String(date));

    // VISÃO RESUMIDA
    if (view === "summary") {
      return res.json({
        date: report.date,
        total: Number(report.profit.toFixed(2)),
  revenue: Number(report.revenue.toFixed(2)),
  cost: Number(report.cost.toFixed(2)),
        result: report.result,
      });
    }

    // VISÃO DETALHADA (default)
    return res.json({
      date: report.date,
      revenue: {
        total: Number(report.revenue.toFixed(2)),
      },
      cost: {
        total: Number(report.cost.toFixed(2)),
      },
      profit: Number(report.profit.toFixed(2)),
      result: report.result,
    });
  }
}
