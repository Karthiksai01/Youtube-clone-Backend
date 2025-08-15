import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
//import  videoController from "./controllers/videoController.js";
import videoRoutes from './Routes/videoRoutes.js'
import cookieParser from "cookie-parser";
import commentRoutes from './Routes/commentRoutes.js';
import cors from "cors"

dotenv.config();

const app = express();
app.use(cookieParser());


const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true                // allow cookies / sessions
}));

// Middleware
app.use(express.json());
//app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Mongoose connected successfully");
})
.catch((error) => {
  console.error("MongoDB connection failed:", error.message);
});

// Routes
app.use('/auth',userRoutes);
app.use('/api',videoRoutes);
app.use('/commentApi',commentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
