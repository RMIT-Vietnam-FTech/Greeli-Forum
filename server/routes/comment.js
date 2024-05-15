import express from "express";
import * as commentController from "../controllers/comment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(commentController.getComments)
  .post(verifyToken,commentController.createComment);

export default router;
