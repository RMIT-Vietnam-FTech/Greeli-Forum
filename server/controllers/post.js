import crypto from "node:crypto";
import Post from "../models/Post.js";

import { deleteFileData, uploadFileData } from "../service/awsS3.js";

const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

export const createPost = async (req, res) => {
	//req.body -> title, content, createBy{}
	try {
		const { title, content, uploadFile, threadId } = req.body;
		const user = req.user;
		if (user) {
			const uploadObject = {};
			uploadObject.title = title;
			uploadObject.content = content;
			uploadObject.createBy = {
				userId: user.id,
				username: user.username,
				profileImage: user.profileImage,
			};
			uploadObject.belongToThread = threadId;
			if (uploadFile) {
				const imageName = createRandomName();
				uploadFileData(
					uploadFile.buffer,
					imageName,
					uploadFile.mimetype,
				);
				uploadObject.uploadFile = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
			}
      console.log(uploadObject);
			// const post = new Post({ uploadObject });
			// await post.save();
			// res.location(`localhost:9000/api/v1/posts/${post._id}`);
			res.status(204).json("Create success");
		} else {
			res.status(403).json("Forbidden");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getPosts = async (req, res) => {
	//pagination
	try {
		//filter -> threadId
		//sorting
		const { sort, threadId, page, limit } = req.query;
		let sortObject = { time: 1 };
		if (sort === "hot") {
			sortObject = { time: 1 };
		}
		if (sort === "new") {
			sortObject = { createdAt: 1 };
		}
		if (sort === "top") {
			sortObject = { upvoteLength: 1 };
		}
		const filter = {};
		if (threadId) {
			filter.belongToThread = threadId;
		}
		//sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))
		const posts = await Post.aggregate().facet({
			metadata: [{ $count: "total" }],
			data: [
				{ $match: { filter } },
				{
					$addFields: {
						upvoteLength: { $size: "$upvote" },
						commentLength: { $size: "$comments" },
						time: {
							$divide: [
								{
									$add: [
										{ $size: "$upvote" },
										{ $size: "$comments" },
									],
								},
								{ $substract: [Date.now() - $createdAt] },
							],
						},
					},
				},
				{ $sort: sortObject },
				{ $skip: (page - 1) * limit },
				{ $limit: limit },
			],
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { postId } = req.query;
		const post = await Post.findById({ _id: postId });
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const modifyPost = async (req, res) => {
	try {
		const { postId, content } = req.body;
		const user = req.user;
		const post = await Post.findById({ postId });
		if (post) {
			if (post.createBy.userId === user._id) {
				post.content = content;
				post.save();
				res.status(204);
			} else {
				res.status(403).json("Forbidden");
			}
		} else {
			res.status(404).json("Not found");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const { postId } = req.body;
		const user = req.user;
		const post = await Post.findById({ postId });
		if (post) {
			if (post.createBy.userId === user._id) {
				deleteFileData(post.uploadFile);
				await Post.deleteOne({ _id: post._id });
				res.status(204);
			} else {
				res.status(403).json("Forbidden");
			}
		} else {
			res.status(404).json("Not found");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const archivedPost = async (req, res) => {
	try {
	} catch (error) {}
};


