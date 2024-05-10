import express from 'express';
import { getPosts, createPost } from '../controllers/post.js';
import multer from "multer";
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

// router.get('/get', getPosts);
// router.post('/create', createPost);

export default router;
