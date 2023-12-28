import { Router } from "express";
import errorRouter from "./error.route";
import authRouter from "./auth.routes";
import taskRouter from "./task.router";

export const routes = Router();

routes.use("/auth", authRouter);
routes.use("/task", taskRouter);
routes.use("/", errorRouter);
