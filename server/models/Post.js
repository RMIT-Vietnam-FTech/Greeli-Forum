import mongoose from "mongoose";
import Comment from "./Comment.js";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		postImage: {
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
		parentThread: {
			type: String,
			required: true,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		upvote: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Post", postSchema);