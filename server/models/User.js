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
			default:
				"https://d46o92zk7g554.cloudfront.net/1716350848246-965924355-Frame%201361%20(2).png",
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
		description: {
			type: String,
			default: null,
		},
		resetPasswordToken: {
			type: String,

		}
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
