import mongoose from "mongoose";
import Post from "./Post.js";
import Thread from "./Thread.js";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 5,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdPost: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		archivedPost: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		followThread: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Thread",
			},
		],
		isActivated: {
			type: Boolean,
			default: true,
		},
		isLocked: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: "user",
		},
		profileImage: {
			type: String,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
