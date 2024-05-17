import express from "express";
import * as UserController from "../controllers/user.js"; 
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:id", UserController.getUser);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.put("/:adminId/:userId/lock",verifyToken, verifyAdmin, UserController.lock);
router.put("/:adminId/:userId/unlock",verifyToken, verifyAdmin, UserController.unlock);

router.route("/:userId/created_threads")
.get(verifyToken,UserController.getCreatedThread);

router.route("/:userId/follow_threads")
.get(verifyToken, UserController.getFollowThread)
.post(verifyToken, UserController.postFollowThread)
.delete(verifyToken,UserController.deleteFollowThread);

router.route("/:userId/archived_posts")
.get(verifyToken, UserController.getArchivedPost)
.post(verifyToken, UserController.postArchivedPost)
.delete(verifyToken, UserController.deleteArchivedPost)

export default router;
