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
} from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/find/:id", verifyToken, getUser);
router.get("/:id", getProfile);
router.post("/:id/update", updateUserProfile);
router.post("/login", login);
router.post("/register", register);
router.get("/getAll", verifyToken, getAllUser);
router.put("/:adminId/:userId/lock", verifyToken, verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyToken, verifyAdmin, unlock);

export default router;
