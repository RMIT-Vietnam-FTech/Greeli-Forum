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
		const verified = await jwt.verify(token, process.env.JWT_SECRET);
		if (!verified) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const verifyAdmin = async (req, res, next) => {
	// const user = await User.findById(req.params.adminId);
	// if (!user) return res.status(400).json({ error: "User doesn't exist" });
	// if (!req.user || req.user.role !== "admin") {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({ error: "Forbidden (Admin access required)" });
	}
	next();
};

export const verifyThreadAdmin = async (req, res, next) => {
	// const user = await User.findById(req.params.adminThreadId);
	// if (!user) return res.status(400).json({ error: "User doesn't exist" });
	// if (!req.user || req.user.role !== "admin") {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({ error: "Forbidden (Admin access required)" });
	}
	next();
};
