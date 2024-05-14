import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", verifyToken, createMessage);
router.get("/find/:chatId", verifyToken, getMessages);
export default router;
