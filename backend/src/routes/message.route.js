import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getConversation,
  getUsers,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);

router.get("/conversation/:receiverId", protectRoute, getConversation);
router.post("/conversation/:receiverId", protectRoute, sendMessage);

export default router;
