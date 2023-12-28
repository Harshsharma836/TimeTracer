import { Request, Response } from "express";
import { logger } from "../middleware/log.middleware";

class ErrorController {
  static get(error: any, req: Request, res: Response): void {
    logger.error(`Error Occur : ${error}`);
  }
}

export default ErrorController;
