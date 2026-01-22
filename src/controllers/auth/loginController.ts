
import { Request, Response } from "express";
import { LoginService } from "../../services/auth/loginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new LoginService();
    const result = await service.execute(email, password);

    return res.json(result);
  }
}
