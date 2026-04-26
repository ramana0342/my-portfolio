import { insertChatMessage } from "../models/chatModel.js";

let onlineUsers = new Map();
let adminOnline = false;
let socketUserMap = new Map();

const emitOnlineUsers = (io) => {
  io.emit("online_users", {
    users: Array.from(onlineUsers.keys()), // only user_ids
    admin: adminOnline
  });
};

export const setupChatSocket = (io) => {



  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // ---------------- ADMIN ----------------
    socket.on("join_admin", () => {
      socket.join("admin_room");
      socket.data.role = "admin";

      adminOnline = true;

      emitOnlineUsers(io);
    });

    // ---------------- USER ----------------
    socket.on("join_room", (user_id) => {
      if (socket.data.role === "admin") return;

      socket.join(user_id);

      socket.data.user_id = user_id;
      socket.data.role = "user";

      if (!onlineUsers.has(user_id)) {
        onlineUsers.set(user_id, new Set());
      }

      onlineUsers.get(user_id).add(socket.id);

      emitOnlineUsers(io);
    });

    // ---------------- MESSAGE ----------------
    socket.on("send_message", (data) => {
      const messageData = {
        ...data,
        created_at: new Date(),
      };

      io.to(data.user_id).emit("receive_message", messageData);
      io.to("admin_room").emit("receive_message", messageData);

      io.to("admin_room").emit("update_user_list");

      io.to("admin_room").emit("new_message_alert", {
        user_id: data.user_id,
        sender_type: data.sender_type
      });

      insertChatMessage(messageData).catch(console.error);
    });

    // ---------------- TYPING (FIXED DIRECTION) ----------------
    socket.on("typing", ({ user_id }) => {
      const role = socket.data.role;

      if (role === "admin") {
        io.to(user_id).emit("typing", {
          user_id,
          sender: "Admin",
        });
      } else {
        io.to("admin_room").emit("typing", {
          user_id,
          sender: "User",
        });
      }
    });

    // ---------------- DISCONNECT ----------------
    socket.on("disconnect", () => {
      const { user_id, role } = socket.data;

      // ADMIN
      if (role === "admin") {
        adminOnline = false;
        emitOnlineUsers(io);
        return;
      }

      // USER
      if (user_id && onlineUsers.has(user_id)) {
        const userSockets = onlineUsers.get(user_id);

        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
          onlineUsers.delete(user_id); // 🔥 truly offline
        }
      }

      emitOnlineUsers(io);
    });
  });
};