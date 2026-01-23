import { Request } from "express";
import { UserRole } from "@prisma/client";

export interface AuthenticatedRequest extends Request {
  userId: string; // obrigatório quando a rota é protegida
   role: UserRole;
}



