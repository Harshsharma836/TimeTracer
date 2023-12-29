import { Request } from "express";

export interface userInter {
  id: number;
  email: string;
  password: string;
}

export interface reqInter extends Request {
  user?: userInter;
}

export interface TaskInter {
  title: string;
  description: string;
  status: string;
}
