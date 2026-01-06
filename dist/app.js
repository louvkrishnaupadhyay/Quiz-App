import express from "express";
import mongoose from 'mongoose';
import userRoute from "./routes/user.js";
const app = express();
const connectionString = process.env.CONNECTION_STRING || " ";
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello I am working");
});
app.use('/user', userRoute);
try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected");
    app.listen(process.env.PORT);
    console.log("server connected");
}
catch (err) {
    console.error("MongoDB connection error:", err);
}
//# sourceMappingURL=app.js.map