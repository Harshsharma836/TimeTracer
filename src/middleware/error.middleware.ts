import { Request, Response } from "express";

export const errorMiddleWare = (req: Request, res: Response) => {
  res.send({
    msg: "Something Wrong",
  });
};
