// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/expressRequest";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token faltando" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedRequest;

    (req as any).userId = decoded.userId;
    (req as any).role = decoded.role;

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
