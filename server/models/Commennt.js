import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	content: {
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
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
