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
	activateAccount,
	logout,
	uploadProfileImage,
	requestResetPassword,
	resetPassword,
} from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import { get } from "mongoose";
import multer from "multer";
import { RestoreRequestType } from "@aws-sdk/client-s3";

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: function fileFilter(req, file, callback) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
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

router.get("/find/:id", verifyToken, getUser);
router.get("/getAll", verifyToken, getAllUser);
router.get("/:id", getProfile);
router.post(
	"/:id/uploadImage",
	verifyToken,
	upload.single("image"),
	uploadProfileImage
);
router.post("/requestResetPassword", requestResetPassword);
router.post("/resetPassword/:token/:userId", resetPassword);
router.post("/logout", verifyToken, logout);
router.post("/:id/update", updateUserProfile);
router.post("/:id/deactivate", deactivateAccount);
router.post("/:id/activate", activateAccount);
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
