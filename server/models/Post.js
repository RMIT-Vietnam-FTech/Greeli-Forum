import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		belongToThread: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Thread",
			require: true,
		},
		belongToTopics: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Topic",
			},
		],
		title: {
			type: String,
			required: true,
			minLength: 5,
			maxLength: 100,
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
			type: JSON,
			required: false,
		},
		plainTextContent: {
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
				default: null,
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
		verifiedAt: {
			type: Date,
			default: () => new Date(),
		},
		archived: {
			isArchived: {
				type: Boolean,
				required: true, 
				default: false,
			},
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
					default: null,
				},
				profileImage: {
					type: String,
					default: null,
				},
			},
		},
		isDeleted:{
			type: Boolean,
			required: true, 
			default: false 
		}
	},
	{ timestamps: true },
);
const Post = mongoose.model("Post", postSchema);
export default Post;
