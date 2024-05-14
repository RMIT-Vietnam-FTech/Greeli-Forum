import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		content: {
			type: String,
			required: false,
		},
		uploadFile: {
			type: String,
			required: false,
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
			useId: {
				type: String,
				required: true,
			},
			username: {
				type: String,
				required: true,
			},
			userImage: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true },
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
