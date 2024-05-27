import express from "express";

import { sendEmail } from "../service/email.js";

const router = express.Router();

router.post("/send", async (req, res) => {
	try {
		const { receiver, subject, text } = req.body;
		await sendEmail(receiver, subject, text);
		res.status(200).json("send successfully");
	} catch (error) {
		res.status(500).json("Server internal error");
		console.log(error);
	}
});

export default router;
