import express from 'express';
import { getPosts, createPost } from '../controllers/post.js';

const router = express.Router();

router.get('/get', getPosts);
router.post('/create', createPost);

export default router;
