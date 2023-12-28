import express from "express";
import { authroize, validateAuthInput } from "../middleware/auth.middleware";
import AuthController from "../controllers/auth.controller";
import TaskController from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.post("/addtask", authroize, TaskController.createTask);
taskRouter.get("/gettask/:id", authroize, TaskController.getTaskById);
taskRouter.get("/gettask/", authroize, TaskController.getAllTask);
taskRouter.delete(":id", authroize, TaskController.deleteTaskById);
taskRouter.patch("updatetask/:id", authroize, TaskController.updateTaskById);

export default taskRouter;
