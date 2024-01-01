import { Queue } from "bullmq";

const emailQueue = new Queue('email-queue');

// Producer Creating a Message
async function init(){
    const result  = await emailQueue.add("email to harsh", {
        email : 'Harsh@gmail.com',
        subject : 'Welcome',
        body : 'Hey welcome to platform'
    })
    console.log('Job added to Queue' , result.id)
}

init();