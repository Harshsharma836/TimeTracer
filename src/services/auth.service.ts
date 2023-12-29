import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

@Service()
export class AuthService {
  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      
      if (user) {
        const pass = await bcrypt.compare(password, user.password);
        if (pass) {
          const secretKey = process.env.SECRET || "TOPSECRET";
          const token = jwt.sign({ id: user.id }, secretKey);
          return token;
        } else {
          return `InCorrect Password`;
        }
      } else {
        return `User is Not Registered`;
      }
    } catch (error: any) {
      return error.message;
    }
  }

  async register(email: string, password: string) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashPassword,
        },
      });
      return user;
    } catch (error: any) {
      return error.message;
    }
  }
}

export default AuthService;
