import { NextFunction, Request, Response } from "express";
import { clientRedis } from "../redis/redis.config";
import { Buffer } from "buffer";
import EventEmitter = require("events");
const event = new EventEmitter();

interface RateLimitInter {
  endpoints: string;
  ratelimit: {
    time: number;
    limit: number;
  };
}

export const ratelimit = (rule: RateLimitInter) => {
  const { endpoints, ratelimit } = rule;
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am callled");
    event.on("redis", (val) => {
      console.log(`Event : ${val}`);
    });
    const ip = req.ip;

    const redisid = `${endpoints}/${ip}`; // //ipaddress
    console.log(`RedisKey = ${redisid}`);
    const request = await clientRedis.incr(redisid); // it will create a key and give 1 number if not
    event.emit("redis", () => {
      `Redis Event Occured`;
    });
    // Id is expire within the time -> ratelimet.time
    if (request === 1) {
      await clientRedis.expire(redisid, ratelimit.time);
    }

    if (request > ratelimit.limit) {
      console.log("TO Many Request");
      return res.status(424).json({
        msg: "To Many Request",
      });
    }
    next();
  };
};

export const rateLimitedParams: RateLimitInter = {
  endpoints: "/",
  ratelimit: {
    time: 60,
    limit: 3,
  },
};
