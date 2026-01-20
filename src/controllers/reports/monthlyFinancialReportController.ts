// src/controllers/report/dailyFinancialReportController.ts
import { Request, Response } from "express";
import { MonthlyFinancialReportService } from "../../services/reports/monthlyFinancialReportService";

export class MonthlyFinancialReportController {
  async handle(req: Request, res: Response) {
    const { date, view } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Data obrigatória" });
    }

    const service = new MonthlyFinancialReportService();
    const report = await service.execute(String(date));

    // VISÃO RESUMIDA
    if (view === "summary") {
      return res.json({
        period: {
          startDate: report.startDate,
          endDate: report.endDate,
        },
        total: Number(report.profit.toFixed(2)),
        revenue: Number(report.revenue.toFixed(2)),
        cost: Number(report.cost.toFixed(2)),
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
