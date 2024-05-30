import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import { uploadFileData } from "../service/awsS3.js";
import * as crypto from "crypto";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";

const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

export const createComment = async (req, res) => {
	try {
		const { content, parentId, postId } = req.body;

		const uploadFile = req.file;

		const user = await User.findById(req.user.id);
		if (!user) {
			res.status(404).json({ message: "userId not found or invalid" });
		}

		if (!postId) {
			res.status(400).json({ message: "Bad Request" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			res.status(404).json({ message: "postId is not found or invalid" });
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
		if (uploadFile) {
			commentObject.uploadFile = {
				src: null,
				type: null,
			};
			const imageName = createRandomName();
			const uploadFileMetaData = await fileTypeFromBuffer(uploadFile.buffer);
			const uploadFileMime = uploadFileMetaData.mime.split("/")[0];
			if (uploadFileMime === "image") {
				const fileBuffer = await sharp(uploadFile.buffer)
					.jpeg({ quality: 100 })
					.resize(1000)
					.toBuffer();
				await uploadFileData(fileBuffer, imageName, uploadFile.mimetype);
				commentObject.uploadFile.type = "image";
			} else {
				await uploadFileData(uploadFile.buffer, imageName, uploadFile.mimetype);
				commentObject.uploadFile.type = "video";
			}
			commentObject.uploadFile.src = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
		}

		const comment = new Comment(commentObject);
		console.log("check 9");

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
		await comment.save();

		res.status(201).json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const uploadCommentFile = async (req, res) => {
	try {
		res.status(201).json(result);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
export const getComments = async (req, res) => {
	try {
		let { postId, parentId, page, limit, userId } = req.query;

		if (!page) {
			page = "1";
		}
		if (!limit) {
			limit = "20";
		}
		const queryCommand = {};

		if (parentId) {
			if (parentId !== "null") {
				queryCommand.parentId = new mongoose.Types.ObjectId(parentId);
			} else {
				queryCommand.parentId = null;
			}
		}

		if (userId) {
			queryCommand["createdBy.userId"] = userId;
		}

		if (postId !== "null" && postId) {
			const post = await Post.findById(postId);
			if (!post) {
				res.status(400).json("postId is not found or invalid");
			}
			queryCommand._id = { $in: post.comments };
		}
		const comments = await Comment.aggregate([{ $match: queryCommand }]).facet({
			metadata: [
				{
					$project: {
						_id: 1,
					},
				},
				{ $count: "total" },
				{
					$addFields: {
						page: parseInt(page),
						limit: parseInt(limit),
					},
				},
			],

			data: [
				{
					$sort: {
						createdAt: -1,
					},
				},
				{ $skip: (Number.parseInt(page) - 1) * limit },
				{ $limit: Number.parseInt(limit) },
			],
		});

		if (!comments) return res.status(400).json("cannot found items");
		res.status(200).json({
			metadata: comments[0].metadata[0],
			data: comments[0].data,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const getArchivedComments = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const sort = req.query.sort || "newest";

		let sortCriteria;
		switch (sort) {
			case "newest":
				sortCriteria = { createdAt: -1 };
				break;
			case "oldest":
				sortCriteria = { createdAt: 1 };
				break;
			case "most-posts":
				sortCriteria = { createdPost: -1 };
				break;
			case "least-posts":
				sortCriteria = { createdPost: 1 };
				break;
			default:
				sortCriteria = { createdAt: -1 };
		}
		const comments = await Comment.find({ "archived.isArchived": true })
			.select("-password")
			.skip(skip)
			.limit(limit)
			.sort(sortCriteria);
		const totalComments = await Comment.find({
			"archived.isArchived": true,
		}).countDocuments();
		res.status(200).json({ comments, totalComments });
		console.log(comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postUpVote = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		if (!commentId) return res.status(400).json("Bad Request");

		const comment = await Comment.findById(commentId);
		if (!comment) return res.status(400).json("post id not found or invalid");

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
		if (!comment) return res.status(400).json("post id not found or invalid");

		comment.upvote.remove(req.user.id);
		await comment.save();
		res.status(204).json("Success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const archiveComment = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		if (!commentId) return res.status(400).json({ message: "Bad Request" });

		const comment = await Post.findById(commentId);
		if (!comment)
			return res.status(404).json({ message: "post id not found or invalid" });

		{
			/*check who can able to archived post*/
		}
		const user = await User.findById(req.user.id);
		if (!user)
			return res
				.status(404)
				.json({ message: "userId is invalid or not found" });

		if (!(req.user.role === "admin" || user._id === comment.createdBy.userId))
			return res.status(403).json({ message: "Forbidden" });

		comment.archived.isArchived = true;
		comment.archived.archivedBy = {
			userId: user._id,
			username: user.username,
			profileImage: user.profileImage,
		};
		await comment.save();

		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
// export const unArchiveComment = async (req, res) => {
// 	try {
// 		const commentId = req.params.commentId;
// 		if (!commentId) return res.status(400).json({ message: "Bad Request" });

// 		const comment = await Post.findById(commentId);
// 		if (!comment)
// 			return res.status(404).json({ message: "post id not found or invalid" });

// 		{
// 			/*check who can able to archived post*/
// 		}
// 		const user = await User.findById(req.user.id);
// 		if (!user)
// 			return res
// 				.status(404)
// 				.json({ message: "userId is invalid or not found" });

// 		if (!(req.user.role === "admin" || user._id === comment.createdBy.userId))
// 			return res.status(403).json({ message: "Forbidden" });

// 		comment.archived.isArchived = false;
// 		comment.archived.archivedBy = {
// 			userId: null,
// 			username: null,
// 			profileImage: null,
// 		};
// 		await comment.save();

// 		res.status(200).json({ message: "Archived successfully!" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

export const unarchiveComment = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		if (!commentId) return res.status(400).json({ message: "Bad Request" });

		const comment = await Comment.findById(commentId);
		if (!comment)
			return res
				.status(404)
				.json({ message: "comment id not found or invalid" });
		comment.archived.isArchived = false;
		comment.archived.archivedBy = {
			userId: null,
			username: null,
			isDeactivated: false,
			profileImage: null,
		};
		await comment.save();
		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
