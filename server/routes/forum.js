import express from "express";
import * as forumController from "../controllers/forum.js";

const router = express.Router();

router.get("/statistic",forumController.getForumStatistic);
router.get("/leaderboard", forumController.getForumLeadboard)

export default router;