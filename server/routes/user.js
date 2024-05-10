import express from "express";
import { login, register } from "../controllers/user.js";
import { lock, unlock } from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/:adminId/:userId/lock",verifyAdmin, lock);
router.put("/:adminId/:userId/unlock", verifyAdmin, unlock);

export default router;
