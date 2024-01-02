import { Queue } from "bullmq";
import { workerFunc } from "./worker";
const emailQueue = new Queue("email-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
workerFunc();
// Producer Creating a Message

export async function init(email: String, subject: String, body: String) {
  const result = await emailQueue.add("SendingEmail", {
    email: email,
    subject: subject,
    body: body,
  });

  console.log("Job added to Queue", result.id);
  return "Email Added to Bull Queue";
}
