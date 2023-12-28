import express from "express";
import ErrorController from "../controllers/error.controller";

const errorRouter = express.Router();
errorRouter.get("/", ErrorController.get);

export default errorRouter;
