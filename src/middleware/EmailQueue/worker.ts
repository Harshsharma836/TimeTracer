import { Worker } from "bullmq";
import * as nodemailer from "nodemailer";
const wait = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

const sendEmail = async (email: String, subject: String, body: String) => {
  await wait(20 * 1000); // 20000

  // Configure nodemailer with your email service provider
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harshsharma72001@gmail.com",
      pass: "xppf haho tdnz kuyk ",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "harshsharma72001@gmail.com",
    to: "harsh.sharma@cubexo.io",
    subject: "Test Email from Bull MQ",
    text: "This is a test email sent from Harsh Sharma.",
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    // this code will wait for 5 seconds.
    setTimeout(() => {}, 10 * 1000);
    return "Email sent successfully!";
  } catch (error: any) {
    console.log(error);
    return `Error sending email: ${error.message}`;
  }
};

export async function workerFunc() {
  const worker = new Worker(
    "email-queue",
    async (job) => {
      const { email, subject, body } = job.data;
      console.log(`Message Rec id : ${job.id}`);
      console.log(`Sending Email to ${email} with jobid ${job.id}`);

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
}
