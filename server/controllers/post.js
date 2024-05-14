

import * as crypto from 'crypto';
import Post from "../models/Post.js";
import Thread from "../models/Thread.js";
import User from "../models/User.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";
import { ServerSideEncryptionByDefaultFilterSensitiveLog } from "@aws-sdk/client-s3";

const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");
	crypto.randomBytes(bytes).toString("hex");

export const createPost = async (req, res) => {
	//req.body -> title, content, createBy{}
	try {
		const title = req.body.title;
		const content = req.body.content;
		const uploadFile = req.file;
		const parentThread = req.body.parentThread;
		const user = req.user;
		console.log(
			`title: ${title}\n content: ${content}\n uploadFile: ${uploadFile}\n parentThread: ${parentThread}\n user: ${user}`,
		);
		if (req.user) {
			const user = await User.findById(req.user.id);
			// console.log(user);
			const uploadObject = {};
			uploadObject.title = title;
			uploadObject.content = content;
			uploadObject.createdBy = {
				userId: user._id,
				username: user.username,
			};

			if (user.profileImage) {
				uploadObject.createdBy.profileImage = user.profileImage;
			}
			const thread = await Thread.find({ title: parentThread });
			console.log(`check thread: ${thread}`);
			if (thread) {
				uploadObject.parentThread = parentThread;
			} else {
				res.status(404).json("thread name is not found or invalid");
			}

			if (uploadFile) {
				const imageName = createRandomName();
				await uploadFileData(
					uploadFile.buffer,
					imageName,
					uploadFile.mimetype,
				);
				uploadObject.uploadFile = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
			}

			const post = new Post(uploadObject);
			await post.save();
			// thread.posts.push(post._id);
			// await thread.save();
			res.location(`localhost:9000/api/v1/posts/${post._id}`);
			res.status(204).json("Create success");
		} else {
			res.status(401).json("Unauthorized");
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
		const { sort, threadName, page, limit } = req.query;
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
		if (threadName) {
			filter.parentThread = threadName;
		}
		//sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))
		const posts = await Post.aggregate().facet({
			metadata: [{ $count: "total" }],
			data: [
				{ $match: filter },
				{
					$addFields: {
						// upvoteLength: { $size: "$upvote" },
						// commentLength: { $size: "$comments" },
						time: {
							$divide: [
								{
									$add: [
										{ $size: "$upvote" },
										{ $size: "$comments" },
									],
								},
								{ $subtract: [Date.now(), "$createdAt"] },
							],
						},
					},
				},
				{ $sort: sortObject },
				{ $skip: (page - 1) * limit },
				{ $limit: Number.parseInt(limit) },
			],
		});
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { postId } = req.params;
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
			if (post.createdBy.userId === user._id) {
				post.content = content;
				post.save();
				res.status(204);
			} else {
				res.status(401).json("Unauthorized");
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
		const { postId } = req.params;
		const user = req.user;
		const post = await Post.findById({ postId });
		if (post) {
			if (post.createdBy.userId === user._id) {
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

export const deleteAllPost = async (req, res) =>{
	try{
		await Post.deleteMany({});
		res.status(200).json("success");
	}
	catch(error){
		res.status(500).json({message: error.message});
	}
}
