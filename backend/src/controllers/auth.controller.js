import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    generateToken(user._id, res);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // protectRoute trong auth.route.js set user đã xác thực vào req nên chỉ cần dùng là được
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    // log config (chỉ log an toàn, KHÔNG log secret)
    console.log("Cloudinary config:", {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      api_secret: cloudinary.config().api_secret ? "HIDDEN" : "MISSING",
    });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Update failed",
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
