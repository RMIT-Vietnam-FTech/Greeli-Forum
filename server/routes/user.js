import express from "express";
import { login, register } from "../controllers/user.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.route("/:userId", async (req, res) => {
	const { userId } = req.params;
	const user = await User.findById(userId);
	console.log(user);
});
export default router;
