import express from "express";
import { createNews, getNews } from "../controllers/news.js";

const router = express.Router();

router.get("/get", getNews);
router.post("/create", createNews);

export default router;
