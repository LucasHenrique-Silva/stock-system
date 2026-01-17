// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erros controlados da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  }

  // Erros conhecidos do Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          error: true,
          message: "Registro duplicado (campo único)",
          meta: err.meta,
        });

      case "P2025":
        return res.status(404).json({
          error: true,
          message: "Registro não encontrado",
        });

      default:
        return res.status(400).json({
          error: true,
          message: "Erro de banco de dados",
          code: err.code,
        });
    }
  }

  // Erros de validação do Prisma
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: true,
      message: "Dados inválidos para o banco",
    });
  }

  // Erro inesperado (bug)
  console.error(err);

  return res.status(500).json({
    error: true,
    message: "Erro interno do servidor",
  });
}
