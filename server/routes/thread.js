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

router
	.route("/")
	.get()
	.post(
		verifyToken,
		upload.single("uploadFile"),
		threadController.createThread,
	);
router.get("/get/threadId/rule", verifyAdmin, threadController.getThreadRules);
router.post("/create/threadId/rule", verifyAdmin, threadController.createThreadRule);
router.post("/create",threadController.createThread);
router.put("/modify/threadId/rule/ruleId", verifyAdmin, threadController.modifyThreadRule);
router.put("/delete/threadId/rule", verifyAdmin, threadController.deleteThreadRule);
router.put("/delete/threadId/rule/ruleId", verifyAdmin, threadController.deleteThreadRuleByRuleIndex);
export default router;
