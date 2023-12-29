import { NextFunction, Request, Response } from "express";
import { clientRedis } from "../redis/redis.config";
import { reqInter } from "../utils/helper/user.interface";

export const ratelimit = async (
  req: reqInter,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  let ratelimit = {
    time: 60,
    limit: 5,
  };

  const endpoints = req.url;
  const ip = req.ip;
  const redisid = `${endpoints}/${user?.id}/${ip}`;
  const request = await clientRedis.incr(redisid); // it will create a key and give 1 number if not

  // Id is expire within the time -> ratelimet.time
  if (request === 1) {
    await clientRedis.expire(redisid, ratelimit.time);
  }

  if (request > ratelimit.limit) {
    return res.status(424).json({
      msg: "To Many Request , Please wait for 1 Min",
    });
  }
  next();
};
