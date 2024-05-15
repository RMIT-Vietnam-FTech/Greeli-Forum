import express from "express";
import { getProfile, getUser, login, register, lock, unlock } from "../controllers/user.js";
// import { getProfile } from "../controllers/userProfile.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/find/:id", getUser);
router.get("/:id", getProfile);
router.post("/login", login);
router.post("/register", register);
router.put("/:adminId/:userId/lock",verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyAdmin, unlock);

export default router;
