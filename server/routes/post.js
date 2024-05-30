import express from "express";
import multer from "multer";
import { createPost, getPosts } from "../controllers/post.js";
import * as PostController from "../controllers/post.js";
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
});

const router = express.Router();

router
	.route("/")
	.get(PostController.getPosts)
	.post(verifyToken, upload.single("uploadFile"), PostController.createPost)
	.delete(PostController.deleteAllPost);

router
	.route("/:postId")
	.get(PostController.getPost)
	.put(verifyToken, PostController.modifyPost)
	.delete(verifyToken, PostController.deletePost);

router.post(
	"/:postId/archive",
	verifyToken,
	// verifyAdmin,
	PostController.archivePost,
);

router.delete(
	"/:postId/archive",
	verifyToken,
	// verifyAdmin,
	PostController.unarchivePost,
);

router
	.route("/:postId/upvote")
	.post(verifyToken, PostController.postUpVote)
	.delete(verifyToken, PostController.deleteUpvote);

// router
// 	.route("/admin/archived")
// 	.get(verifyToken, verifyAdmin, PostController.getArchivedPosts);
export default router;
