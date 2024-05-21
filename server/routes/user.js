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
	getCreatedPost,
	postCreatedPost,
	deleteCreatedPost,
	changePassword,
	deactivateAccount,
} from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/find/:id", verifyToken, getUser);
router.get("/getAll", verifyToken, getAllUser);
router.get("/:id", getProfile);
router.post("/:id/update", updateUserProfile);
router.post("/:id/deactivate", deactivateAccount);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/register", register);
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

router
	.route("/:userId/created_posts")
	.get(getCreatedPost)
	.post(verifyToken, postCreatedPost)
	.delete(verifyToken, deleteCreatedPost);

export default router;
