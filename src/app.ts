import express, { Application } from "express";
import { routes } from "./routes";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/", routes);
  }

  public getApp(): Application {
    return this.app;
  }
}

export default new App().getApp();
