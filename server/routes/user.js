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
} from "../controllers/user.js";
import multer from "multer";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import User from "../models/User.js";
import { get } from "mongoose";

/*FILE STORAGE*/
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(__dirname, "/server/public/image/avatar"));
// 	},
// 	filename: (req, file, cb) => {
// 		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// 		cb(null, `${uniqueSuffix}_${file.originalname}`);
// 	},
// });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 		cb(new Error("Only .jpeg or .png files are allowed!"), false);
// 	}
// }

// const upload = multer({storage: storage, fileFilter: fileFilter});

const router = express.Router();

router.get("/find/:id", verifyToken, getUser);
router.get("/getAll", verifyToken, getAllUser);
router.get("/:id", getProfile);
// router.post("/upload/:userId", upload.single("image"), async (req, res) => {
// 	try {
// 		const userId = req.params.userId;
// 		const user = await User.findByIdAndUpdate(userId, { profileImage: `/image/avatar/${req.file.filename}`});
// 		res.status(201).json('File uploaded succesfully!');
// 	} catch (error) {
// 		res.status(500).json(error)
// 		console.log(error)
// 	}
// })
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
