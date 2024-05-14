import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment",
		default: null,
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
			required: true,
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
});
{
	timestamps: true;
}
{
	timestamps: true;
}
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
