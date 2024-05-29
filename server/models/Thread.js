import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			// immutable: true,
			required: true,
			min: 5,
			max: 20,
		},
		content: {
			type: String,
			required: false,
			default: null,
		},
		uploadFile: {
			src: {
				type: String,
			},
			type: {
				type: String,
			},
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		rule: [
			{
				title: String,
				description: String,
			},
		],
		createdBy: {
			userId: {
				type: String,
				required: true,
			},
			username: {
				type: String,
				required: true,
			},
			profileImage: {
				type: String,
				required: false,
				default: null,
			},
		},
		followedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		isHidden: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true },
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
