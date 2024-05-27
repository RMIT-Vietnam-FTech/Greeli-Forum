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
		fileSize: 1024 * 1024 * 15, //15MB
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

router.put("/:postId/archive", verifyToken, verifyAdmin, PostController.archivePost);

router
	.route("/:postId/upvote")
	.post(verifyToken, PostController.postUpVote)
	.delete(verifyToken, PostController.deleteUpvote);
export default router;
