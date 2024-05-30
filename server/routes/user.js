import { RestoreRequestType } from "@aws-sdk/client-s3";
import express from "express";
import { ExpressValidator } from "express-validator";
import { get } from "mongoose";
import multer from "multer";
import {
	activateAccount,
	changePassword,
	deactivateAccount,
	deleteArchivedPost,
	deleteCreatedPost,
	deleteFollowThread,
	getAllUser,
	getArchivedPost,
	getCreatedPost,
	getCreatedThread,
	getFollowThread,
	getProfile,
	getUser,
	lock,
	login,
	logout,
	postArchivedPost,
	postCreatedPost,
	postFollowThread,
	register,
	requestResetPassword,
	resetPassword,
	unlock,
	updateUserProfile,
	uploadProfileImage,
} from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";
const { body, validationResult } = new ExpressValidator();

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
router.post("/logout", logout);
router.post(
	"/:id/uploadImage",
	verifyToken,
	upload.single("image"),
	uploadProfileImage,
);

router.post(
	"/requestResetPassword",
	[[body("email").notEmpty().trim().escape()]],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: "Invalid input" });
		}

		next();
	},
	requestResetPassword,
);

router.post(
	"/resetPassword/:token/:userId",
	[
		[
			body("password")
				.notEmpty()
				.trim()
				.escape()
				.isLength({ min: 6 })
				.matches("[0-9]")
				.matches("[A-Z]")
				.matches("[a-z]"),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: "Invalid input" });
		}

		next();
	},
	resetPassword,
);
router.post("/:id/update", updateUserProfile);
router.post("/:id/deactivate", deactivateAccount);
router.post("/:id/activate", activateAccount);
router.post(
	"/login",
	[
		[
			body("email").isEmail().trim().escape(),
			body("password").notEmpty().trim().escape(),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: "Invalid input" });
		}

		next();
	},
	login,
);
router.post("/change-password", changePassword);

router.post(
	"/register",
	[
		[
			body("username").notEmpty().trim().escape(),
			body("email").isEmail().trim().escape(),
			body("password")
				.notEmpty()
				.trim()
				.escape()
				.isLength({ min: 6 })
				.matches("[0-9]")
				.matches("[A-Z]")
				.matches("[a-z]"),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: "Invalid input" });
		}

		next();
	},
	register,
);

router.put("/:adminId/:userId/lock", verifyToken, verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyToken, verifyAdmin, unlock);

router.route("/:userId/created_threads").get(verifyToken, getCreatedThread);

router
	.route("/:userId/follow_threads")
	.get(verifyToken, getFollowThread)
	.post(verifyToken, postFollowThread)
	.delete(verifyToken, deleteFollowThread);

router
	.route("/:userId/saved_posts")
	.get(verifyToken, getArchivedPost)
	.post(verifyToken, postArchivedPost)
	.delete(verifyToken, deleteArchivedPost);

router
	.route("/:userId/created_posts")
	.get(getCreatedPost)
	.post(verifyToken, postCreatedPost)
	.delete(verifyToken, deleteCreatedPost);

export default router;
