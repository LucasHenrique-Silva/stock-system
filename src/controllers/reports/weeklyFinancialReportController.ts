// src/controllers/report/dailyFinancialReportController.ts
import { Request, Response } from "express";
import { WeeklyFinancialReportService } from "../../services/reports/weeklyFinancialReportService";

export class WeeklyFinancialReportController {
  async handle(req: Request, res: Response) {
    const { date, view } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Data obrigatória" });
    }

    const service = new WeeklyFinancialReportService();
    const report = await service.execute(String(date));

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
