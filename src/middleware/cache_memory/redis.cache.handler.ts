import { logger } from "../../middleware/log.middleware";
import clientRedis from "../../redis/redis.config";

const USER_KEY_PREFIX = "user";

export const cacheStore = async (userId: number, task: string) => {
  const userKey = `${USER_KEY_PREFIX}:${userId}`;
  
  try {
    // Store key as user:id value as json
    await clientRedis.lPush(userKey, JSON.stringify(task));
    // Expire Key after 5min , so we take the fresh data
    await clientRedis.expire(userKey, 300);
  } catch (error) {
    console.error(`Error caching data for user ${userId}:`, error);
    // Handle the error as per your application's needs
  }
};

export const cacheExpire = async (userId: number) => {
  const userKey = `${USER_KEY_PREFIX}:${userId}`;
  
  try {
    await clientRedis.expire(userKey, 0);
  } catch (error) {
    console.error(`Error expiring cache for user ${userId}:`, error);
    // Handle the error as per your application's needs
  }
};

// Not using Now: Bull MQ is using
// Queue for Multiple Request handling for Task Completed
export const requestHandler = async (userId: number, taskId: number) => {
  try {
    await clientRedis.lPush(
      `Request-Task-Completed`,
      `user:${userId} task:${taskId}`
    );
  } catch (error) {
    logger.error(`Error in Redis Cache Memory ${error}`);
    console.error(`Error handling request for user ${userId}, task ${taskId}:`, error);
  }
};
