import express from "express";
import multer from "multer";
import * as threadController from "../controllers/thread.js";
import { verifyToken } from "../middleware/auth.js";
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: function fileFilter(req, file, callback) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/gif" ||
			file.mimetype === "image/webp"||
			file.mimetype === "video/mp4" ||
			file.mimetype === "video/webm"
		) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 15, //15MB
	},
});
const router = express.Router();

router
	.route("/")
	.get()
	.post(
		verifyToken,
		upload.single("uploadFile"),
		threadController.createThread,
	).delete(threadController.reset);
router.get("/get/threadId/rule", verifyAdmin, getThreadRules);
router.post("/create/threadId/rule", verifyAdmin, createThreadRule);
router.put("/modify/threadId/rule/ruleId", verifyAdmin, modifyThreadRule);
router.put("/delete/threadId/rule", verifyAdmin, deleteThreadRule);
router.put("/delete/threadId/rule/ruleId", verifyAdmin, deleteThreadRuleByRuleIndex);
export default router;
