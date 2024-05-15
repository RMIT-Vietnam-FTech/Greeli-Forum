import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.header("Authorization");
		if (!token) {
			// res.redirect("/")
			return res.status(403).json({ message: "Access Denied" });
		}
		if (token.startsWith("Bearer ")) {
			token = token.slice(7, token.length).trimLeft();
		}
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const verifyAdmin = async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) return res.status(400).json({ error: "User doesn't exist" });
	// if (!req.user || req.user.role !== "admin") {
		if (user.role !== "admin") {
		return res
			.status(403)
			.json({ error: "Forbidden (Admin access required)" });
	}
	next();
};
