// Import Cloudinary SDK (v2 API) và đặt tên là 'cloudinary'
import { v2 as cloudinary } from "cloudinary";

// mặc định đã gọi dotenv.config() từ index.js để nạp các biến vào process.env rồi, mà process là biến toàn cục nên chỉ cần dùng lại là được

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
