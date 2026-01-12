import express from "express";
import type { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js"
import projectError from "./helper/error.js";
import quizRoute from "./routes/quiz.js";
import examRoute from "./routes/exam.js";


const app = express();

const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

interface returnResponse {
    status: 'success' | 'error',
    message: String,
    data:{} | []
}

declare global{
  namespace Express{
    interface Request{
      userId: String;
    }
  }
}

app.get('/', (req: any, res: any) =>{
    res.send("Hello I am working");
})


//redirect user to userRoute
app.use('/user', userRoute);


// Redirect auth to authRoute
app.use('/auth', authRoute);

// redirect to quiz router
app.use('/quiz', quizRoute);

//redirect to exam router
app.use('/exam', examRoute);



app.use((err: projectError, req: Request, res: Response, next: NextFunction) => {


  let message:String;
  let statusCode:number;
  
  if(!!err.statusCode && err.statusCode < 500){                //!! ka mtlb hai there exist
    message = err.message;
    statusCode = err.statusCode;
  }
  else{
    message = "Something went wrong please try after sometime";
    statusCode = 500;
  }
    let resp:returnResponse = {status:"error", message, data:{}}
    if(!!err.data){               
      resp.data = err.data;
    }

    console.log(err.statusCode, err.message);
    res.status(statusCode).send(resp);          //statusCode ka type small n se hona chahiye
})

try {
  await mongoose.connect(connectionString);
  console.log("MongoDB connected");
  app.listen(process.env.PORT);
  console.log("server connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


