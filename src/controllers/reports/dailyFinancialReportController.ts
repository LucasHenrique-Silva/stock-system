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
        total: report.profit,
        revenue: report.revenue,
        cost: report.cost,
        result: report.result,
      });
    }

    // VISÃO DETALHADA (default)
    return res.json({
      date: report.date,
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
