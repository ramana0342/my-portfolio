import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import pool from "./config/database.js";
import { setupChatSocket } from "./sockets/chatSocket.js";
import userRoutes from "./routes/userContactMessagesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


const app = express();

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupChatSocket(io);

app.use(cors());
app.use(express.json());

app.use("/my-portfolio/api/user", userRoutes);
app.use("/my-portfolio/api/admin", adminRoutes);
app.use("/my-portfolio/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 6000;

const startServer = async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Database Connected Successfully");
    console.log("DB Time:", result.rows[0].now);

    server.listen(PORT, () => {
      console.log(`Server started running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();