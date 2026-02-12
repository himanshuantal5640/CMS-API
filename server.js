import "dotenv/config";
import dotenv from "dotenv";
import http from 'http';
import { Server } from "socket.io";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import { registerSocketHandlers } from "./sockets/socket.js";
cloudinary;



const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*",
    credentials:true, // manage cookies
  }
});

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});