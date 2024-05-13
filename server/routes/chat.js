import express from "express";
import { createChat, findAllChat, findUserChat } from "../controllers/chat.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", verifyToken, createChat);
router.get("/find/:userId", verifyToken, findAllChat);
router.get("/find/:senderId/:receiverId", verifyToken, findUserChat);
export default router;
