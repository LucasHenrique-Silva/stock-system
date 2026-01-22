import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token faltando" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // ⬇ aqui você força o tipo só internamente
    (req as any).userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
