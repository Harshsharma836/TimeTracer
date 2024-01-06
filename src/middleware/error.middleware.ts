import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  // Log the error for debugging purposes
  console.error(err);

  // Send a proper JSON response with a status code and error message
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
};