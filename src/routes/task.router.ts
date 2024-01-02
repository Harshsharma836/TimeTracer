import express from "express";
import { authroize, validateAuthInput } from "../middleware/auth.middleware";
import AuthController from "../controllers/auth.controller";
import TaskController from "../controllers/task.controller";
import { ratelimit } from "../middleware/rate.limiting.middleware";

const taskRouter = express.Router();

taskRouter.post("/addtask", authroize, ratelimit, TaskController.createTask);
taskRouter.get(
  "/gettask/:id",
  authroize,
  ratelimit,
  TaskController.getTaskById,
);
taskRouter.get("/gettask/", authroize, TaskController.getAllTask);
taskRouter.delete(":id", authroize, ratelimit, TaskController.deleteTaskById);
taskRouter.patch(
  "/updatetask/:id",
  authroize,
  ratelimit,
  TaskController.updateTaskById,
);

taskRouter.post("/sendemail", authroize, TaskController.sendEmail);

export default taskRouter;
