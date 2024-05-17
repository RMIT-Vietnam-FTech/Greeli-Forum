import express from "express";
import { getUser, login, register, lock, unlock, getAllUser } from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/find/:id", verifyToken, getUser);
router.post("/login", login);
router.post("/register", register);
router.get("/getAll", verifyToken, getAllUser)
router.put("/:adminId/:userId/lock", verifyToken, verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyToken, verifyAdmin, unlock);

export default router;
