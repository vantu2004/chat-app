import jwt from "jsonwebtoken";

// set cookie cho response hoặc trả về token khi cần dùng
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Chặn JavaScript phía client (document.cookie) đọc cookie này. Giúp giảm nguy cơ XSS attack.
    secure: process.env.NODE_ENV !== "development", // Nếu không chạy ở chế độ development, cookie sẽ chỉ gửi qua kết nối HTTPS.
    sameSite: "strict", // Chỉ gửi cookie khi request đến từ cùng domain, chặn csrf attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
