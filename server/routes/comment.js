import express from "express";
import multer from "multer";
import * as commentController from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";
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
});
const router = express.Router();

router
	.route("/")
	.get(commentController.getComments)
	.post(
		verifyToken,
		upload.single("uploadFile"),
		commentController.createComment
	);
router.route("/:commentId/archive").post(commentController.archiveComment);
// .delete(verifyToken, commentController.unArchiveComment);
router.put(
	"/:commentId/archive-by-deactivating",
	// verifyToken,
	commentController.archiveCommentByDeactivating
);

router
	.route("/:commentId/unarchive")
	.put(verifyToken, commentController.unarchiveComment);
router
	.route("/:commentId/upvote")
	.post(verifyToken, commentController.postUpVote)
	.delete(verifyToken, commentController.deleteUpvote);

router
	.route("/admin/archived")
	.get(verifyToken, commentController.getArchivedComments);
export default router;
