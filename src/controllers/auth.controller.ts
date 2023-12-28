import { Request, Response } from "express";
import { Container } from "typedi";
import { logger } from "../middleware/log.middleware";
import AuthService from "../services/auth.service";

class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    console.log("Called");
    try {
      const { email, password } = req.body;
      const data = await Container.get(AuthService).login(email, password);
      res.json({ message: `${data}` });
    } catch (error) {
      logger.error(`Error Occur on HelloController ${error}`);
      res.json({
        msg: "Something went wrong , check log for better check",
      });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await Container.get(AuthService).register(email, password);
      res.json({ message: `User Created Successfully` });
    } catch (error) {
      logger.error(`Error Occur on HelloController ${error}`);
      res.json({
        msg: "Something went wrong , check log for better check",
      });
    }
  }
}

export default AuthController;
