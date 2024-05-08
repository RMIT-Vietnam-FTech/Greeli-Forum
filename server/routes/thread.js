import express from "express";
import { createThread } from "../controllers/thread.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", createThread);
export default router;
