import { Queue } from "bullmq";
import { workerFunc } from "./worker";

// Email Send Queue
const emailQueue = new Queue("email-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

workerFunc(); // Calling a Worker , It will take message from Queue one by One.

// Producer Creating a Message
// job name is SendingEmail and payload is data
export async function initEmailQueue(
  email: String,
  subject: String,
  body: String,
) {
  const result = await emailQueue.add("SendingEmail", {
    email: email,
    subject: subject,
    body: body,
  });
  console.log("Job added to Queue", result.id);
  return "Email Added to Bull Queue";
}
