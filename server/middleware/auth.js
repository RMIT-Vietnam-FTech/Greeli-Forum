import jwt from "jsonwebtoken";

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
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


export const verifyAdmin = async (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({error: "Forbidden (Admin access required)"})
	}
	next()
}