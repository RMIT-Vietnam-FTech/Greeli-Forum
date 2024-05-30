import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			// immutable: true,
			required: true,
			mineLength: 5,
			maxLength: 20,
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
		archivedBy: {
			userId: {
				type: String,
				default: null,
			},
			username: {
				type: String,
				default: null,
			},
			isDeactivated: {
				type: Boolean,
				default: false,
			},
			profileImage: {
				type: String,
				default: null,
			},
		},
	},
	{ timestamps: true },
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
