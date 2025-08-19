import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // $ne: not equal
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({
      createdAt: 1,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params; // lấy từ URL
    const { text, image } = req.body; // lấy từ body
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // dựa theo receiverId từ URL lấy receiverSocketId tại userSocketMap trong socket.js, dựa vào receiverSocketId để gửi message
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
