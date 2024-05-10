import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		belongToThread: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
		},
		title: {
			type: String,
			required: true,
		},
		uploadFile: {
			type: String,
			required: false,
		},
		content: {
			type: String,
			required: false,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
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
				required: true,
			},
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
const Post = mongoose.model("Post", postSchema);
export default Post;