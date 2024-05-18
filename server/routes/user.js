import express from "express";
import {
	getProfile,
	updateUserProfile,
	getUser,
	login,
	register,
	lock,
	unlock,
	getAllUser,
	getCreatedThread,
	getFollowThread,
	postFollowThread,
	deleteFollowThread,
	getArchivedPost,
	postArchivedPost,
	deleteArchivedPost,
	changePassword,
} from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/find/:id", verifyToken, getUser);
router.get("/:id", getProfile);
router.post("/:id/update", updateUserProfile);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/register", register);
router.get("/getAll", verifyToken, getAllUser);
router.put("/:adminId/:userId/lock", verifyToken, verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyToken, verifyAdmin, unlock);

router.route("/:userId/created_threads").get(verifyToken, getCreatedThread);

router
	.route("/:userId/follow_threads")
	.get(verifyToken, getFollowThread)
	.post(verifyToken, postFollowThread)
	.delete(verifyToken, deleteFollowThread);

router
	.route("/:userId/archived_posts")
	.get(verifyToken, getArchivedPost)
	.post(verifyToken, postArchivedPost)
	.delete(verifyToken, deleteArchivedPost);

export default router;
