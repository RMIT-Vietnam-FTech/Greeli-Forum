import Topic from "../models/Topic.js";
import express from "express";
import * as topicController from "../controllers/topic.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router
	.route("/")
	.get(topicController.getTopics)
	.post(verifyToken, verifyAdmin, topicController.createTopic);

router.route("/:topicId").get(topicController.getTopic);

export default router;
