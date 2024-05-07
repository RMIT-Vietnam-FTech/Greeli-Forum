import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/create", createMessage);
router.get("/find/:chatId", getMessages);
export default router;