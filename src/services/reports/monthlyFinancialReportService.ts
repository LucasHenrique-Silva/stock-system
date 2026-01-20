// src/services/report/dailyFinancialReportService.ts
import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class MonthlyFinancialReportService {
  async execute(date: string) {
    if (!date) {
      throw new AppError("Data obrigatória");
    }

    const end = new Date(`${date}T23:59:59.999Z`);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 29);
    start.setUTCHours(0, 0, 0, 0);

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
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      revenue,
      cost,
      profit,
      result: profit >= 0 ? "LUCRO" : "PREJUÍZO",
    };
  }
}
