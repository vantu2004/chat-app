import { Server } from "socket.io";
import http from "http"; // Module có sẵn trong Node.js, để tạo HTTP server
import express from "express"; // Framework để tạo web server/API nhanh chóng

// Khởi tạo ứng dụng Express
const app = express();

// Tạo HTTP server và gắn Express app vào
// => giúp server có thể xử lý cả request HTTP bình thường lẫn kết nối Socket.IO
const server = http.createServer(app);

// Khởi tạo Socket.IO server, gắn vào HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // Cho phép frontend (React chạy ở cổng 3000) kết nối
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// Lắng nghe sự kiện "connection" -> chạy khi có client mới kết nối tới server
io.on("connection", (socket) => {
  // Mỗi client khi kết nối sẽ có một socket.id duy nhất
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId; // Lấy userId tại khi client kết nối
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Gửi danh sách tất cả user đang online (["u1", "u2", ...]) tới tất cả client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Lắng nghe sự kiện "disconnect" -> chạy khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// app: xử lý REST API (GET/POST/PUT/DELETE…).
// server: HTTP server thật, là “nền tảng” cho cả 2.
// io: xử lý WebSocket events (real-time chat, notifications…).
export { app, server, io };
