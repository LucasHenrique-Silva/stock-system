// src/services/report/dailyFinancialReportService.ts
import { prisma } from "../../config/prisma";
import { AppError } from "../../errors/AppError";

export class DailyFinancialReportService {
  async execute(date: string) {
    if (!date) {
      throw new AppError("Data obrigatória");
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

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
      date,
      revenue,
      cost,
      profit,
      result: profit >= 0 ? "LUCRO" : "PREJUÍZO",
    };
  }
}
