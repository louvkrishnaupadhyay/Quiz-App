import express from "express";
import type { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js"


const app = express();

const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

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



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.send("Something went wrong please try after sometime");
})

try {
  await mongoose.connect(connectionString);
  console.log("MongoDB connected");
  app.listen(process.env.PORT);
  console.log("server connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


