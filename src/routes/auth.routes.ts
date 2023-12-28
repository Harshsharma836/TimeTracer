import express from "express";
import { validateAuthInput } from "../middleware/auth.middleware";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", validateAuthInput, AuthController.login);

authRouter.post("/register", validateAuthInput, AuthController.register);

export default authRouter;
