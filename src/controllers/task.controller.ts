import { Request, Response } from "express";
import { Container } from "typedi";
import TaskService from "../services/task.service";
import { reqInter, userInter } from "../utils/helper/user.interface";

class TaskController {
  static async createTask(req: reqInter, res: Response) {
    try {
      const { title, description, dueDate } = req.body;
      if (req.user) {
        let user: userInter = req.user;
        const task = await Container.get(TaskService).createTask(
          title,
          description,
          dueDate,
          req.user?.id,
        );
        res.status(200).send({
          task: task,
        });
      }
    } catch (error) {
      res.status(300).send({
        msg: "Something Wrong Check the Error Logs",
      });
    }
  }

  static async getTaskById(req: reqInter, res: Response) {
    try {
      if (req.user) {
        const { id } = req.user;
        const taskId = Number(req.params.id);

        //if(!taskId) return res.status(300).send(`Provide Task Id`)
        const task = await Container.get(TaskService).getTask(id, taskId);
        if (!task) {
          res.status(404).send(`No Task Available by ${taskId}`);
        }
        res.status(200).send({
          task: task,
        });
      }
    } catch (error) {
      res.status(300).send({
        msg: "Something Wrong Check the Error Logs",
      });
    }
  }

  static async getAllTask(req: reqInter, res: Response) {
    try {
      if (req.user) {
        const { id } = req.user;
        const task = await Container.get(TaskService).getAllTask(id);
        if (!task) {
          res.status(404).send(`No Task Available by ${id}`);
        }
        res.status(200).send({
          task: task,
        });
      }
    } catch (error) {
      res.status(300).send({
        msg: "Something Wrong Check the Error Logs",
      });
    }
  }

  static async deleteTaskById(req: reqInter, res: Response) {
    try {
      if (req.user) {
        const { id } = req.user;
        const { taskId } = req.body;
        const task = await Container.get(TaskService).deleteTaskById(
          id,
          taskId,
        );
        if (!task) {
          res.status(404).send(`No Task Available by ${taskId}`);
        }
        res.status(200).send({
          task: task,
        });
      }
    } catch (error) {
      res.status(300).send({
        msg: "Something Wrong Check the Error Logs",
      });
    }
  }

  static async updateTaskById(req: reqInter, res: Response) {
    try {
      if (req.user) {
        const { id } = req.user;
        const { taskId } = req.body;
        const task = await Container.get(TaskService).updateTaskById(
          id,
          taskId,
        );
        if (!task) {
          res.status(404).send(`No Task Available by ${taskId}`);
        }
        res.status(200).send({
          task: task,
        });
      }
    } catch (error) {
      res.status(300).send({
        msg: "Something Wrong Check the Error Logs",
      });
    }
  }
}

export default TaskController;
