import express from "express";
import { getNews, createNews } from "../controllers/news.js";

const router = express.Router();

router.get("/get", getNews);
router.post("/create", createNews);

export default router;
