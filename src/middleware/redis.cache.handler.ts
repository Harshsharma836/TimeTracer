import { Redis } from "ioredis";
import clientRedis from "../redis/redis.config";
import { TaskInter } from "../utils/helper/user.interface";

export const cacheStore = async (userId: number, task: string) => {
  // Store key as user:id value as json
  await clientRedis.lPush(`user:${userId}`, JSON.stringify(task));
  // Expire Key after 5min , so we take the fresh data
  await clientRedis.EXPIRE(`user:${userId}`, 300);
};

export const cacheExpire = async (userId: number) => {
  await clientRedis.EXPIRE(`user:${userId}`, 0);
};

// Queue for Multiple Request handling for Task Completed
export const requestHandler = async(userId : number , taskId : number)=>{
  await clientRedis.lPush(`Request-Task-Completed` , `user:${userId} task:${taskId}`);
}