import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
export const createComment = async (req, res) => {
	try {
		const { content, parentId, postId } = req.body;
		console.log(
			//   `check input: \n content: ${content}\n parentId: ${parentId}\n postId: ${postId}`
		);
		const user = await User.findById(req.user.id);
		if (!user) {
			res.status(404).json("userId not found or invalid");
		}
		if (!postId) {
			res.status(400).json("Bad Request");
		}
		const post = await Post.findById(postId);
		if (!post) {
			res.status(404).json("postId is not found or invalid");
		}
		const commentObject = {
			content: content,
			createdBy: {
				userId: user._id,
				username: user.username,
			},
		};
		if (user.profileImage) {
			commentObject.createdBy.profileImage = user.profileImage;
		}

		// console.log("check commentObject: " + JSON.stringify(commentObject));
		const comment = new Comment(commentObject);

		if (parentId) {
			const parentComment = await Comment.findById(parentId);
			if (!parentComment) {
				res.status(404).json("parenId comment is not found or invalid");
			}

			comment.parentId = parentComment._id;

			parentComment.replies.push(comment._id);
			await parentComment.save();
		}

		post.comments.push(comment._id);
		await post.save();
		const savedComment = await comment.save();
		console.log("check comment after save:  " + savedComment);

		res.status(201).json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getComments = async (req, res) => {
	try {
		const { postId, parentId } = req.query;
		console.log(
			//   `check iput:\n postId: ${postId}\n parentId: ${parentId}\n check TypeOf:\n postId type: ${typeof postId}\n parenId type: ${typeof parentId}`
		);
		const queryCommand = {};

		if (parentId) {
			if (parentId !== "null") {
				queryCommand.parentId = parentId;
			} else {
				queryCommand.parentId = null;
			}
		}

		if (postId !== "null" && postId) {
			const post = await Post.findById(postId);
			if (!post) {
				res.status(400).json("postId is not found or invalid");
			}
			queryCommand._id = { $in: post.comments };
		}
		console.log("check query Comment: " + JSON.stringify(queryCommand));
		const comments = await Comment.find(queryCommand).sort({
			createdAt: -1,
		});
		if (!comments) return res.status(400).json("cannot found items");
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postUpVote = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		if (!commentId) return res.status(400).json("Bad Request");

		const comment = await Comment.findById(commentId);
		if (!comment)
			return res.status(400).json("post id not found or invalid");

		comment.upvote.push(req.user.id);
		await comment.save();
		res.status(204).json("Success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const deleteUpvote = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		if (!commentId) return res.status(400).json("Bad Request");

		const comment = await Comment.findById(commentId);
		if (!comment)
			return res.status(400).json("post id not found or invalid");

		comment.upvote.remove(req.user.id);
		await comment.save();
		res.status(204).json("Success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
