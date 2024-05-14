import express from "express";
import multer from "multer";
import {
  createThread,
  getThreadRules,
  createThreadRule,
  modifyThreadRule,
  deleteThreadRule,
  deleteThreadRuleByRuleIndex,
} from "../controllers/thread.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: function fileFilter(req, file, callback) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/gif" ||
			file.mimetype == "video/mp4" ||
			file.mimetype == "video/webm"
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

router.post("/create", createThread);
router.get("/get/threadId/rule", verifyAdmin, getThreadRules);
router.post("/create/threadId/rule", verifyAdmin, createThreadRule);
router.put("/modify/threadId/rule/ruleId", verifyAdmin, modifyThreadRule);
router.put("/delete/threadId/rule", verifyAdmin, deleteThreadRule);
router.put("/delete/threadId/rule/ruleId", verifyAdmin, deleteThreadRuleByRuleIndex);
export default router;
