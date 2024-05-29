import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
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
		content: {
			type: String,
			required: true,
		},
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
				default: null,
			},
		},
		upvote: {
			type: Array,
			default: [],
		},
		replies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		timestamps: true,
	},
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
