import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { logger } from "../middleware/log.middleware";
import { number } from "joi";

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
      logger.error(`Something Wrong : ${error}`);
      throw new Error(`Something Went Wrong , Please check log`);
    }
  }

  async getTask(userId: number, taskId: number) {
    try {
      const task = prisma.task.findMany({
        where: {
          id: taskId,
        },
      });
      return task;
    } catch (error) {
      logger.error(`Something Wrong : ${error}`);
      return `Something Went Wrong , Please check log`;
    }
  }

  async getAllTask(userId: number) {
    try {
      const task = prisma.task.findMany({
        where: {
          userId: userId,
        },
      });
      return task;
    } catch (error) {
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
      return `Task Deleted Successfully`;
    } catch (error) {
      logger.error(`Something Wrong : ${error}`);
      throw new Error(`Something Went Wrong , Please check log`);
    }
  }

  // Change Status
  async updateTaskById(userid: number, taskId: number) {
    try {
      const checkTaskByUser = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      if (checkTaskByUser?.userId != userid) {
        return `UnAuthorized , Task is Not Yours`;
      }

      const updateTask = prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status: "done",
        },
      });
    } catch (error) {
      logger.error(`Something Wrong : ${error}`);
      throw new Error(`Something Went Wrong , Please check log`);
    }
  }
}
export default TaskService;
