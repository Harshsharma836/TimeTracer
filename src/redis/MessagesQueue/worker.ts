import { Worker } from "bullmq";


const sendEmail = ()=>{
    new Promise<void>((resolve , reject)=>{
        setTimeout(()=>
            resolve()
         , 5* 1000 )
    })
}

// It take the Message one by one and give it to callback
const worker = new Worker('email-queue' , async(job)=>{
    console.log(`Message Rec id : ${job.id}`);
    console.log('Processing message');
    console.log(`Sending Email to ${job.data.email}`);

    // Suppose this take 5 Seconds to send Email 
    await sendEmail();
    console.log('Email Send');
});