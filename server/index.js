import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./DB/connect_db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import MsgRoutes from "./routes/msgRoutes.js";
import { Server } from "socket.io";

// Config dotenv
config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use("/api/v1", userRoutes);
app.use("/api/v1/messages", MsgRoutes);

// Connect to DB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`.green.bold);
});

// Create an instance of socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  maxHttpBufferSize: 1e8 // 100 MB
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });