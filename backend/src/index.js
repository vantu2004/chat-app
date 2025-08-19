import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cor from "cors";
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();

const PORT = process.env.PORT;
// path.resolve() <=> process.cwd(), khi chạy "npm run start" -> npm tìm vị trí file package.json -> trả về path nây
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
  // Serve toàn bộ file tĩnh (JS/CSS/assets) đã build bởi Vite tại frontend/dist
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // vì path-to-regex là 8.2.0 nên "*" hay "/*" ko còn hợp lệ (dùng lệnh npm ls express path-to-regexp) để check phiên bản

  // Catch-all cho SPA routes NHƯNG loại trừ các route bắt đầu bằng /api/
  // Regex ^(?!\/api\/).* = mọi đường dẫn KHÔNG khởi đầu bằng "/api/"
  app.get(/^(?!\/api\/).*/, (req, res) => {
    // Trả về index.html để client-side router render trang tương ứng
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// nếu dùng app thì express tự tạo 1 http server r gắn app vào để xử lý các request HTTP bình thường, còn server này đã đc cấu hình là http server gốc
server.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
  connectDB();
});
