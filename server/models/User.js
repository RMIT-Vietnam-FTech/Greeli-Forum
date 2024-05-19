import mongoose from "mongoose";

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
		createdThread: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Thread",
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
			default: "/image/avatar/1715931727316_user.png",
		},
		lastActive: {
			type: Date,
			default: Date.now,
		},
		tel: {
			type: String,
			default: null,
		},
		address: {
			type: String,
			default: null,
		},
		gender: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
