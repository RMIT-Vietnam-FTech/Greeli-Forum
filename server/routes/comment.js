import express from "express";
import * as commentController from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(commentController.getComments)
  .post(verifyToken,commentController.createComment);
router.post("/upload", verifyToken, commentController.uploadCommentFile);
router.route("/:commentId/upvote")
.post(verifyToken, commentController.postUpVote)
.delete(verifyToken, commentController.deleteUpvote);

export default router;
