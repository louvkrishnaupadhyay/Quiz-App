import express from "express";
import mongoose from 'mongoose';
import userRoute from "./routes/user.js";
const app = express();
const connectionString = "mongodb+srv://myuser:hiPGgXuRKIfD435j@cluster0.v3bamgn.mongodb.net/workshopdb?appName=Cluster0";
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello I am working");
});
app.use('/user', userRoute);
try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected");
    app.listen(3000);
    console.log("server connected");
}
catch (err) {
    console.error("MongoDB connection error:", err);
}
//# sourceMappingURL=app.js.map