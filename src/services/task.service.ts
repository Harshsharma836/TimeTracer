import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { logger } from "../middleware/log.middleware";
import { number } from "joi";
import { TaskInter } from "../utils/helper/user.interface";
import clientRedis from "../redis/redis.config";
import { cacheExpire, cacheStore, requestHandler } from "../middleware/redis.cache.handler";

const prisma = new PrismaClient();

@Service()
export class TaskService {
  async createTask(
    title: string,
    description: string,
    dueDate: string,
    userid: number,
  ) {
    try {
      const task = await prisma.task.create({
        data: {
          title: title,
          description: description,
          dueDate: dueDate,
          userId: userid,
        },
      });
      return task;
    } catch (error) {
      logger.error(`Task Service : ${error}`);
      throw new Error(`${error}`);
    }
  }

  async getTask(userId: number, taskId: number) {
    try {
      const task = prisma.task.findMany({
        where: {
          id: taskId,
        },
      });
      return await task;
    } catch (error) {
      logger.error(`Something Wrong : ${error}`);
      return `Something Went Wrong , Please check log`;
    }
  }

  async getAllTask(userId: number) {
    try {
      const taskData = await clientRedis.lRange(`user:${userId}`, 0, -1);

      if (taskData.length != 0) {
        console.log("I am hit");
        const data = JSON.parse(taskData[0]);
        return data;
      }
      const task = await prisma.task.findMany({
        where: {
          userId: userId,
        },
      });

      // Cache Midddleware
      cacheStore(userId , JSON.stringify(task));

      return task;
    } catch (error: any) {
      console.log(error);
      logger.error(`Something Wrong : ${error}`);
      return `Something Went Wrong , Please check log`;
    }
  }

  async deleteTaskById(userid: number, taskId: number) {
    try {
      const checkTaskByUser = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      if (checkTaskByUser?.userId != userid) {
        return `UnAuthorized , Task is Not Yours`;
      }

      const task = prisma.task.findUnique({
        where: { id: taskId },
      });
      if (!task) return `No Task Available by this ${taskId}`;
      const taskDeleted = prisma.task.delete({
        where: {
          id: taskId,
        },
      });

      // To Expire the key if exists
      cacheExpire(userid);
      return `Task Deleted Successfully`;
    } catch (error) {
      logger.error(`Something Wrong : ${error}`);
      throw new Error(`Something Went Wrong , Please check log`);
    }
  }

  // Change Status
  async updateTaskById(userid: number, taskId: number, taskBody: TaskInter) {
    try {
      const checkTaskByUser = await prisma.task.findFirst({
        where: {
          id: taskId,
        },
      });
      if (!checkTaskByUser) {
        return `No Task Available by this ID ${taskId}`;
      }
      if (checkTaskByUser?.userId != userid) {
        return `UnAuthorized , Task is Not Yours`;
      }
      const updateTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: taskBody.title,
          status: taskBody.status,
          description: taskBody.description,
        },
      });
      if(updateTask.status == "completed"){
        // To Expire the key if exists
        requestHandler(userid , taskId)
      }

      // To Expire the key if exists
      cacheExpire(userid);

      return updateTask;
    } catch (error: any) {
      console.log(error.message);
      logger.error(`Something Wrong : ${error}`);
      throw new Error(`Something Went Wrong , Please check log`);
    }
  }
}
export default TaskService;

