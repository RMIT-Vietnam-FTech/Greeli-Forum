import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";
export const createComment = async (req, res) => {
	try {
		const { content, parentId, postId } = req.body;
		let post, parentComment;
		if (!req.user) {
			res.status(403).json("Forbidden");
		}
		if (!postId) {
			res.status(400).json("Bad Request");
		}
		post = await Post.findById(postId);
		if (!post) {
			res.status(404).json("postId is not found or invalid");
		}
		const user = await User.findById(req.user.id);

		const commentObject = {
			content: content,
			createdBy: {
				userId: user._id,
				username: user.username,
				profileImage: user.profileImage,
			},
		};

		const comment = new Comment(commentObject);

		if (parentId) {
			parentComment = await Comment.findById(parentId);
			if (!parentComment) {
				res.status(404).json("parenId comment is not found or invalid");
			}
			comment.parentId = parentId;
		}

		await comment.save();
		if (parentComment) {
			parentComment.replies.push(comment._id);
		}
		post.comments.push(comment._id);
		res.status(204).json("create success!");
		res.location(`localhost:9000/api/v1/comments/${comment._id}`);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getComments = async (req, res) => {
	try {
		const { postId, parentId } = req.body;
		const queryCommand = {
			parentId: null,
		};
		if (!postId) {
			res.status(400).json("Bad Request");
		}
		const post = await Post.findById(postId);
		if (!post) {
			res.status(404).json("postId is not found or invalid");
		}
		queryCommand._id = { $in: post.comments };
		if (parentId) {
			queryCommand.parentId = parentId;
		}
		const comments = await Comment.find(queryCommand).toArray();
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getComment = async (req, res) => {
	try {
	} catch (error) {}
};
export const deleteComment = async (req, res) => {
	try {
	} catch (error) {}
};
