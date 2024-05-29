import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Thread from "../models/Thread.js";
import Post from "../models/Post.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";
import { sendEmail } from "../service/email.js";
import express from "express";
import sharp from "sharp";
import crypto from "crypto";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		console.log(username, email, password);
		const userEmail = await User.findOne({ email: email });
		if (userEmail)
			return res.status(400).json({ error: "Email has been used" });

		const userName = await User.findOne({ username: username });
		if (userName)
			return res.status(400).json({ error: "Username has been used" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashPassword,
		});
		const savedUser = await newUser.save();
		res.status(201).json({
			_id: savedUser._id,
			role: savedUser.role,
			message: "success",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ error: "Password incorrect" });
		if (user.isLocked)
			return res
				.status(400)
				.json({ error: "Your account is locked, cannot log in!" });

		const token = await jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "3d" },
		);

		console.log(token);

		delete user.password;

		const updates = {
			lastActive: Date.now(),
		};

		res.cookie("JWT", token, {
			path: "/",
			maxAge: 3 * 24 * 60 * 60 * 1000, // MS
			httpOnly: true, // prevent XSS attacks cross-site scripting attacks
			sameSite: "strict", // CSRF attacks cross-site request forgery attacks
			secure: process.env.NODE_ENV !== "development",
		})
			.status(200)
			.json({
				id: user._id,
				message: "successfully login",
				role: user.role,
				isActivated: user.isActivated,
			});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const requestResetPassword = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });

		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		if (user.isLocked)
			return res
				.status(400)
				.json({ error: "Your account is locked, cannot log in!" });
		const resetToken = crypto.randomBytes(32).toString("hex");
		const salt = await bcrypt.genSalt(10);
		const hashResetToken = await bcrypt.hash(resetToken, salt);
		user.resetPasswordToken = hashResetToken;
		await user.save();
		const link = `${process.env.BASE_URL}/resetPassword/${resetToken}/${user._id}`;

		const emailContent = `Hi ${user.username}
Click the link to reset your password: ${link}`;
		sendEmail(email, "Reset Password", emailContent);

		res.status(200).json({
			message: "Check your email to reset the password",
		});
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};

export const resetPassword = async (req, res) => {
	try {
		// const {id, token} = req.params;
		const { token, userId } = await req.params;
		const password = req.body.password;
		const user = await User.findById({ _id: userId });
		const resetPasswordToken = user.resetPasswordToken;
		if (!resetPasswordToken)
			return res
				.status(403)
				.json({ error: "Invalid or expired password reset token" });
		const isValid = await bcrypt.compare(token, resetPasswordToken);
		if (!isValid)
			return res
				.status(403)
				.json({ error: "Invalid or expired password reset token" });
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		user.password = hashPassword;
		user.resetToken = "";
		await user.save();
		res.status(200).json({ message: "Password created successfully!" });
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};

export const uploadProfileImage = async (req, res) => {
	try {
		const uploadFile = req.file;
		const userId = req.params.id;
		if (uploadFile) {
			const uniqueSuffix =
				Date.now() + "-" + Math.round(Math.random() * 1e9);
			const imageName = uniqueSuffix + "-" + uploadFile.originalname;
			const fileBuffer = await sharp(uploadFile.buffer)
				.jpeg({ quality: 100 })
				.toBuffer();
			await uploadFileData(fileBuffer, imageName, uploadFile.mimetype);
			const user = await User.findByIdAndUpdate(userId, {
				profileImage: `https://d46o92zk7g554.cloudfront.net/${imageName}`,
			});
			res.status(201).json("File uploaded succesfully!");
		}
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("JWT", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const lock = async (req, res) => {
	try {
		const userId = req.params.userId;
		console.log(userId);
		const user = await User.findByIdAndUpdate(userId, { isLocked: true });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		res.status(200).json({ message: "Locked successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const unlock = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findByIdAndUpdate(userId, { isLocked: false });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });
		res.status(200).json({ message: "Unlocked successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deactivateAccount = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndUpdate(userId, {
			isActivated: false,
		});
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json({ message: "Account deactivated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const activateAccount = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndUpdate(userId, {
			isActivated: true,
		});
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json({ message: "Account activated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// export const reportAccount = async (req, res) => {
// 	try {
// 		const reportedUser = req.params.reportedId;
// 		const reportUser = req.params.reportId;
// 		const user = await User.findByIdAndUpdate(userId, {
// 			$push: {reportedBy: reportedUser},
// 		}, {new: true});
// 		if (!user) return res.status(404).json({ message: "User not found" });
// 		res.status(200).json({ message: "Reported successfully!" });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

export const getUser = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		if (user) {
			const { password, ...otherDetails } = user._doc;
			res.status(200).json(otherDetails);
		} else {
			res.status(404).json("No such user");
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getAllUser = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const sort = req.query.sort || "newest";

		let sortCriteria;
		switch (sort) {
			case "newest":
				sortCriteria = { createdAt: -1 };
				break;
			case "oldest":
				sortCriteria = { createdAt: 1 };
				break;
			case "most-posts":
				sortCriteria = { createdPost: -1 };
				break;
			case "least-posts":
				sortCriteria = { createdPost: 1 };
				break;
			default:
				sortCriteria = { createdAt: -1 };
		}

		const users = await User.find()
			.select("-password")
			.skip(skip)
			.limit(limit)
			.sort(sortCriteria);
		const totalUsers = await User.countDocuments();

		res.status(200).json({ users, totalUsers });
		console.log("users count: " + totalUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found" });
		}
		// console.log("User found:", user);
		res.status(200).json({ user });
	} catch (error) {
		console.error("Error fetching user:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const updateUserProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		// console.log(req.body);
		const { username, email, role, profileImage, tel, address, gender } =
			req.body;
		const user = await User.findByIdAndUpdate(userId, {
			username: username,
			email: email,
			role: role,
			profileImage: profileImage,
			tel: tel,
			address: address,
			gender: gender,
		});
		if (!user) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User profile updated" });
	} catch (error) {
		console.error("Error updating user profile:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const changePassword = async (req, res) => {
	try {
		const { userId, oldPassword, newPassword } = req.body;
		console.log(userId);
		const user = await User.findOne({ _id: userId });
		if (!user) {
			console.log("User not found");
		} else {
			const currentPassword = user.password;
			const isMatch = await bcrypt.compare(oldPassword, currentPassword);
			if (isMatch) {
				const newHashPassword = await bcrypt.hash(newPassword, 10);
				await User.findByIdAndUpdate(userId, {
					password: newHashPassword,
				});
				res.status(200).json({
					message: "Password changed successfully!",
				});
			} else {
				res.status(400).json({ message: "Old password is not match!" });
			}
		}
	} catch (error) {
		console.error("Error changing password:", error.message);
		res.status(500).json({ error: "User not found" });
	}
};

export const getCreatedThread = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(404).json({message:"userId not found"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});
		}

		const createdThreads = await Thread.find(
			{ _id: { $in: user.createdThread } },
			{ _id: 1, title: 1 },
		);
		res.status(200).json(createdThreads);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getFollowThread = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(404).json({message:"userId not found"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});
		}

		const followThreads = await Thread.find({
			_id: { $in: user.followThread },
		});
		res.status(200).json(followThreads);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postFollowThread = async (req, res) => {
	try {
		const { threadId } = req.body;
		if (!threadId) return res.status(400).json({message:"Bad Request"});
		const thread = await Thread.findById(threadId);
		if (!thread) res.status(404).json({message:"thread id not found or invalid"});
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json({message:"userId not found or invalid"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});
		}

		thread.followedBy.push(user._id);
		await thread.save();

		user.followThread.push(threadId);
		await user.save();
		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteFollowThread = async (req, res) => {
	try {
		const { threadId } = req.body;
		console.log("check threadId: " + threadId);
		if (!threadId) return res.status(400).json({message:"Bad Request"});
		const thread = await Thread.findById(threadId);
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json({message:"userId not found or invalid"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});
		}
		thread.followedBy.remove(req.user.id);
		await thread.save();

		user.followThread.remove(threadId);
		await user.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getArchivedPost = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(404).json({message:"userId not found"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});

		}

		const archivedPosts = await Post.find({
			_id: { $in: user.archivedPost },
		});
		res.status(200).json(archivedPosts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postArchivedPost = async (req, res) => {
	try {
		const { postId } = req.body;
		if (!postId) return res.status(400).json({message:"Bad Request"});
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json({message:"userId not found or invalid"});
		if (req.user.id !== userId) {
			res.status(403).json({message:"Unauthorized!"});
		}

		user.archivedPost.push(postId);
		await user.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteArchivedPost = async (req, res) => {
	try {
		const { postId } = req.body;
		if (!postId) return res.status(400).json({message:"Bad Request"});
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json("userId not found or invalid");
		console.log("user1: " + user._id);
		console.log("user2: " + req.user.id);
		if (req.user.id !== userId) {
			res.status(403).json("Unauthorized!");
		}
		user.archivedPost.remove(postId);
		await user.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getCreatedPost = async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(404).json("userId not found");
		// if (req.user.id !== userId) {
		// 	res.status(403).json("Unauthorized!");
		// }

		const createdPosts = await Post.find({
			_id: { $in: user.createdPost },
		});
		res.status(200).json(createdPosts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postCreatedPost = async (req, res) => {
	try {
		const { postId } = req.body;
		if (!postId) return res.status(400).json("Bad Request");
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json("userId not found or invalid");
		if (req.user.id !== userId) {
			res.status(403).json("Unauthorized!");
		}

		user.createdPost.push(postId);
		await user.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteCreatedPost = async (req, res) => {
	try {
		const { postId } = req.body;
		if (!postId) return res.status(400).json("Bad Request");
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		if (!user) return res.status(404).json("userId not found or invalid");
		console.log("user1: " + user._id);
		console.log("user2: " + req.user.id);
		if (req.user.id !== userId) {
			res.status(403).json("Unauthorized!");
		}
		user.createdPost.remove(postId);
		await user.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
