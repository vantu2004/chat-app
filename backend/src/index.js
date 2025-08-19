import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cor from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// middleware giúp Express đọc và parse cookie từ request vào req.cookies
app.use(cookieParser());
app.use(
  cor({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// nếu dùng app thì express tự tạo 1 http server r gắn app vào để xử lý các request HTTP bình thường, còn server này đã đc cấu hình là http server gốc
server.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  connectDB();
});
