import express from "express";
import multer from "multer";
import * as threadController from "../controllers/thread.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: function fileFilter(req, file, callback) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/gif" ||
			file.mimetype === "image/webp" ||
			file.mimetype === "video/mp4" ||
			file.mimetype === "video/webm"
		) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 10, //10MB
	},
	storage: storage,
	fileFilter: function fileFilter(req, file, callback) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/gif" ||
			file.mimetype === "image/webp" ||
			file.mimetype === "video/mp4" ||
			file.mimetype === "video/webm"
		) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 10, //10MB
	},
});
const router = express.Router();

router
	.route("/")
	.get(threadController.getThreads)
	.post(
		verifyToken,
		upload.single("uploadFile"),
		threadController.createThread,
	)
	.delete(verifyToken, threadController.reset);

router.post("/validation", verifyToken, threadController.validateThread);

router
	.route("/:threadId")
	.get(threadController.getThread)
	.put(verifyToken, threadController.modifyThreadContent);

router.put(
	"/:threadId/archive",
	verifyToken,
	verifyAdmin,
	threadController.archiveThread,
);

router.put(
	"/:threadId/unarchive",
	verifyToken,
	verifyAdmin,
	threadController.unarchiveThread,
);

router
	.route("/:threadId/rule")
	.post(verifyToken, threadController.createThreadRule)
	.put(verifyToken, threadController.deleteThreadRule);

router.get("/:threadId/statistic", threadController.getThreadStatistic);

router
	.route("/:threadId/rule/:ruleIndex")
	.put(verifyToken, threadController.modifyThreadRule)
	.delete(verifyToken, threadController.deleteThreadRule);

router
	.route("/admin/archived")
	.get(verifyToken, verifyAdmin, threadController.getArchivedThreads);
export default router;
