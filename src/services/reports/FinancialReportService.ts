// src/services/report/dailyFinancialReportService.ts
import { prisma } from "../../config/prisma";
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

export class FinancialReportService {
  async execute(date: string, period: ReportPeriod) {
    if (!date) {
      throw new AppError("Data obrigatória");
    }

    const end = new Date(`${date}T23:59:59.999Z`);
    const start = this.getStartDate(end, period);

    // ======================
    // RECEITA (VENDAS)
    // ======================
    const sales = await prisma.stockExit.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        type: "VENDA",
      },
      select: { total: true },
    });

    const revenue = sales.reduce(
      (sum, s) => sum + Number(s.total),
      0
    );

    // ======================
    // CUSTO (ENTRADAS)
    // ======================
    const entries = await prisma.stockEntryItem.findMany({
      where: {
        stockEntry: {
          createdAt: { gte: start, lte: end },
        },
      },
      select: {
        quantity: true,
        unitCost: true,
      },
    });

    const cost = entries.reduce(
      (sum, e) => sum + Number(e.unitCost) * e.quantity,
      0
    );

    const profit = revenue - cost;

    return {
      period,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      revenue: Number(revenue.toFixed(2)),
      cost: Number(cost.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      result: profit >= 0 ? "LUCRO" : "PREJUÍZO",
    };
  }

  private getStartDate(end: Date, period: ReportPeriod): Date {
    const start = new Date(end);

    switch (period) {
      case ReportPeriod.DAY:
        start.setUTCHours(0, 0, 0, 0);
        return start;

      case ReportPeriod.WEEK:
        start.setUTCDate(start.getUTCDate() - 6);
        break;

      case ReportPeriod.MONTH:
        start.setUTCMonth(start.getUTCMonth() - 1);
        break;

      case ReportPeriod.QUARTER:
        start.setUTCMonth(start.getUTCMonth() - 3);
        break;

      case ReportPeriod.SEMESTER:
        start.setUTCMonth(start.getUTCMonth() - 6);
        break;

      case ReportPeriod.YEAR:
        start.setUTCFullYear(start.getUTCFullYear() - 1);
        break;
    }

    start.setUTCHours(0, 0, 0, 0);
    return start;
  }
}
