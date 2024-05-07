import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		createdBy: {
			username: {
				type: String,
				required: true,
			},
			userImage: {
				type: String,
				required: true,
			},
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},
	{ timestamps: true },
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
