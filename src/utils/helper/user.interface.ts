import { Request } from "express";
export interface userInter {
  id: number;
  email: String;
  password: String;
}

export interface reqInter extends Request {
  user?: userInter;
}
