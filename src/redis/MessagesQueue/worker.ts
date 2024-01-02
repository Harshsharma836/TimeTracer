import { Worker } from "bullmq";

const sendEmail = (email: String, subject: String, body: String) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), 5 * 1000);
  });
};

export async function workerFunc() {
  const worker = new Worker(
    "email-queue",
    async (job) => {
      const { email, subject, body } = job.data;
      console.log(`Message Rec id : ${job.id}`);
      console.log(`Sending Email to ${email}`);

      const msg = await sendEmail(email, subject, body);
      console.log(`Email Send to ${email} with job ${job.id}`);
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
    },
  );

  // worker.on("active", (job) => {
  //   console.debug(`Processing job with id ${job.id}`);
  // });

  // worker.on("completed", (job, returnValue) => {
  //   console.debug(`Completed job with id ${job.id}`, returnValue);
  // });

  // worker.on("error", (failedReason) => {
  //   console.error(`Job encountered an error`, failedReason);
  // });
}
