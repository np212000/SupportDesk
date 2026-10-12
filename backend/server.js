import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

connectDB();
const app = express(); //created express application



app.use(cors()); //cors middleware for frontend for backend connection
app.use(express.json()); //json middleware for understanding frontend data

//test route
app.get("/", (req,res)=>
{
  res.json({message : "SupportDesk API is running"});
});

//for express understandind routes.
app.use("/api/auth",authRoutes);
app.use("/api/tickets",ticketRoutes);

const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, ()=>
{
  console.log(`server running on port ${PORT}`);
});