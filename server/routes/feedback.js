import express from "express";
import { createFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.post("/create", createFeedback);

export default router;