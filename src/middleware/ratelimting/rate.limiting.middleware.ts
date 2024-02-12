import { NextFunction, Request, Response } from "express";
import { clientRedis } from "../../redis/redis.config";
import { reqInter } from "../../utils/helper/user.interface";

// Middleware function to handle rate limiting
export const ratelimit = async (
  req: reqInter, // Custom request interface allowing access to user information
  res: Response,
  next: NextFunction,
) => {
  // Get user information from request
  const user = req.user;

  // Define rate limiting configuration
  let ratelimit = {
    time: 60,   // Time window in seconds
    limit: 5,   // Maximum number of requests allowed within the time window
  };

  // Generate a unique identifier for the request based on endpoint, user ID, and IP address
  const endpoints = req.url;
  const ip = req.ip;
  const redisid = `${endpoints}/${user?.id}/${ip}`;

  // Increment the counter for the current request in Redis
  const requestCount = await clientRedis.incr(redisid); // It will create a key and increment it if it doesn't exist

  // Set expiration for the identifier if it's a new request
  if (requestCount === 1) {
    await clientRedis.expire(redisid, ratelimit.time);
  }

  // Check if the number of requests exceeds the limit
  if (requestCount > ratelimit.limit) {
    // If limit is exceeded, return a 424 (Too Many Requests) status code with a message
    return res.status(424).json({
      msg: "Too Many Requests, Please wait for 1 Min",
    });
  }

  // If the request count is within the limit, continue to the next middleware
  next();
};
