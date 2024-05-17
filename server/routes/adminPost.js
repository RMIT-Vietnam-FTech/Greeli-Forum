import express from "express";
import multer from "multer";
import * as PostController from "../controllers/post.js";
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
    fileSize: 1024 * 1024 * 15, //15MB
  },
});

const router = express.Router();

router.route("/").get(verifyToken, PostController.threadAdminGetPosts);
router.route("/:postId")
.put(verifyToken, PostController.threadAdminVerifyPost)
.delete(verifyToken, PostController.threadAdminDeletePost);
export default router;
