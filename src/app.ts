import express from "express";
import mongoose from 'mongoose';

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js"


const app = express();

const connectionString = process.env.CONNECTION_STRING || "";

app.use(express.json());

app.get('/', (req: any, res: any) =>{
    res.send("Hello I am working");
})


//redirect user to userRoute
app.use('/user', userRoute);


// Redirect auth to authRoute
app.use('/auth', authRoute);

try {
  await mongoose.connect(connectionString);
  console.log("MongoDB connected");
  app.listen(process.env.PORT);
  console.log("server connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


