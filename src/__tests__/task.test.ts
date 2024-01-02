import { PrismaClient } from "@prisma/client";
import app from "../app";
import { describe } from "node:test";
import request from "supertest";
import { taskToAdd, updateTask } from "../utils/product.test.data";
import "reflect-metadata";
const token = process.env.TOKEN;
const prisma = new PrismaClient();

// Auth Check
describe("GET /task/gettask/", async () => {
  test("It will check the authorization", async () => {
    return request(app).get("/task/gettask").expect(201);
  });
});

// Get All Task
describe("GET /task/gettask/", async () => {
  test("It will return all task by UserId", async () => {
    return request(app)
      .get("/task/gettask")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res: any) => {
        expect(res.statusCode).toBe(200);
        console.log(`It Will get all task ${res.task}`);
      });
  });
});

// Post task
let taskId = 0;
describe("POST /task/addtask/", async () => {
  test("It will add task", async () => {
    return request(app)
      .post("/task/addtask")
      .set("Authorization", `Bearer ${token}`)
      .send(taskToAdd)
      .expect(201)
      .then(({ body }) => {
        taskId = body.task.id;
        const checkInDb = prisma.task.findUnique({
          where: {
            id: body.task.id,
          },
        });
        if (!checkInDb) {
          console.log({ msg: "Task in Not Added in Db" });
          return;
        }
        console.log({ msg: "Added Task", taskId });
        return;
      });
  });
});

// Get Task By Id
describe(`GET /task/gettask/${taskId}`, async () => {
  test("It will return task by Id", async () => {
    return request(app)
      .get(`/task/gettask/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res: any) => {
        expect(res.statusCode).toBe(200);
        let data = res.body.task[0];
        console.log({ msg: `Task By Id : ${data.id}` });
      });
  });
});

// Update Task by Id
describe(`PATCH /task/updatetask/${taskId}`, async () => {
  test("It will add task", async () => {
    return request(app)
      .patch(`/task/updatetask/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTask)
      .expect(201)
      .then(({ body }): any => {
        taskId = body.task.id;
        console.log({ msg: "Task Updated", taskId });
      });
  });
});
