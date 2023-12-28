import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { logger } from "./log.middleware";
import { userInter, reqInter } from "../utils/helper/user.interface";

const prisma = new PrismaClient();

// export interface userInter {
//   id: number;
//   email: String;
//   password: String;
// }

// export interface reqInter extends Request {
//   user?: userInter;
// }

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().max(30).min(8).required(),
});

export const validateAuthInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let result = await schema.validate(req.body);
    if (result.error) {
      return res.status(400).send({
        msg: `Schema validation failed ${result.error}`,
      });
    }
    next();
  } catch (error) {
    res.json({
      msg: `Something Wrong`,
    });
  }
};

export const authroize = async (
  req: reqInter,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const secretKey = process.env.SECRET || "TOPSECRET";
      const userVal = jwt.verify(token, secretKey);

      if (userVal) {
        if (typeof userVal != "string") {
          const user = await prisma.user.findUnique({
            where: {
              id: userVal.id,
            },
          });
          if (user) req.user = user;
        }
        next();
      } else {
        return res.status(404).send({
          msg: "Wrong Token Passed",
        });
      }
    } else {
      return res.status(400).send({
        msg: `UnAuthorize Access, Please Provide Token`,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send({
      msg: `Something Went Wrong, Please check the log`,
    });
  }
};
