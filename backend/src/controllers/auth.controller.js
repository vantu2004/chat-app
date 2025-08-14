import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // tạo salt (chuỗi ngẫu nhiên vs 10 lần mã hóa)
    const salt = await bcryptjs.genSalt(10);
    // nối salt vs chuỗi pass gốc rồi tiếp tục dùng bcrypt để hash tiếp
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      // set token và cấu hình cookie sau đó set vào res
      generateToken(savedUser._id, res);
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
