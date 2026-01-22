import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId: string; // obrigatório quando a rota é protegida
}