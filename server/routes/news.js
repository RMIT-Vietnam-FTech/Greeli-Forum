import express from "express";
import { getNews } from "../controllers/news.js";

const router = express.Router();

router.get("/news", getNews);

export default router;
