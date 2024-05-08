import express from "express";
import { createChat, findAllChat, findUserChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/create", createChat);
router.get("/find/:userId", findAllChat);
router.get("/find/:firstId/:secondId", findUserChat);
export default router;
