import exp from "constants";
import * as crypto from "crypto";
import { fileTypeFromBuffer } from "file-type";
import mongoose from "mongoose";
import sharp from "sharp";
import Post from "../models/Post.js";
import Thread from "../models/Thread.js";
import Topic from "../models/Topic.js";
import User from "../models/User.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";

const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

export const createPost = async (req, res) => {
	//req.body -> title, content, createBy{}
	try {
		let uploadFile;
		if (req.file) {
			uploadFile = req.file;
		}
		const user = req.user;
		const { title, content, plainTextContent, belongToThread, belongToTopics } =
			req.body;

		// console.log(`check input:\n req.user: ${req.user}\n req.body: ${JSON.stringify(req.body)}\n file: ${req.file}`);
		if (req.user) {
			const user = await User.findById(req.user.id);
			// console.log(user);
			const uploadObject = {
				belongToTopics: [],
			};
			if (!title) return res.status(400).json({ message: "Bad Request" });
			if (title.length < 5 || title.length > 50)
				return res.status(400).json({ message: "Bad Request" });
			uploadObject.title = title;
			uploadObject.content = content;
			uploadObject.plainTextContent = plainTextContent;
			uploadObject.createdBy = {
				userId: user._id,
				username: user.username,
			};
			if (user.profileImage) {
				uploadObject.createdBy.profileImage = user.profileImage;
			}
			const thread = await Thread.findById(belongToThread);

			//   console.log(`check thread: ${thread}`);
			if (thread) {
				uploadObject.belongToThread = belongToThread;
			} else {
				res.status(404).json({
					message: "thread id is not found or invalid",
				});
			}
			if (!belongToTopics)
				return res
					.status(400)
					.json({ message: "Bad Request, must include topic" });
			for (let i = 0; i < belongToTopics.length; ++i) {
				const topic = await Topic.findById(belongToTopics[i]);
				uploadObject.belongToTopics.push(topic._id);
			}
			if (uploadFile) {
				uploadObject.uploadFile = {
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
					uploadObject.uploadFile.type = uploadFileMime;
				} else {
					await uploadFileData(
						uploadFile.buffer,
						imageName,
						uploadFile.mimetype
					);
					uploadObject.uploadFile.type = uploadFileMime;
				}
				uploadObject.uploadFile.src = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
			}

			const post = new Post(uploadObject);
			await post.save();

			user.createdPost.push(post._id);
			await user.save();

			thread.posts.push(post._id);
			await thread.save();

			res.status(201).json(post._id);
		} else {
			res.status(403).json({ message: "Unauthorized" });
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
		let { sort, filter, belongToThread, belongToTopic, page, limit, search } =
			req.query;

		let response;

		if (belongToThread) {
			const thread = await Thread.findById(belongToThread);
			if (!thread)
				res.status(404).json({
					message: "threadId not found or invalid",
				});
		}

		const filterCommand = {
			isApproved: true,
		};

		if (!page) {
			page = "1";
		}
		if (!limit) {
			limit = "10";
		}
		let sortObject = { time: -1 };
		if (sort === "Hot") {
			sortObject = { time: -1 };
		}
		if (sort === "New") {
			sortObject = { verifiedAt: -1 };
		}
		if (sort === "Top") {
			sortObject = { upvoteLength: -1 };
		}
		if (filter == "unverified") {
			filterCommand.isApproved = false;
		}
		if (belongToTopic) {
			filterCommand.belongToTopics = {
				$in: [mongoose.Types.ObjectId.createFromHexString(belongToTopic)],
			};
		} else if (belongToThread) {
			filterCommand.belongToThread =
				mongoose.Types.ObjectId.createFromHexString(belongToThread);
		}
		if (search) {
			response = await Post.aggregate()
				.search({
					index: "postIndex",
					compound: {
						should: [
							{
								autocomplete: {
									query: search,
									path: "plainTextContent",
								},
							},
							{
								autocomplete: {
									query: search,
									path: "title",
								},
							},
						],
					},
				})
				.project({ plainTextContent: 0, comments: 0, upvote: 0 })
				.limit(10)
				.match({ isApproved: true });
		} else {
			//sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))
			const result = await Post.aggregate([{ $match: filterCommand }]).facet({
				metadata: [
					{
						$project: {
							_id: 1,
						},
					},
					{ $count: "total" },
					{
						$addFields: {
							page: Number.parseInt(page),
							limit: Number.parseInt(limit),
						},
					},
				],
				data: [
					{
						$addFields: {
							upvoteLength: { $size: "$upvote" },
							commentLength: { $size: "$comments" },
							time: {
								$divide: [
									{
										$multiply: [
											{
												$add: [
													{
														$add: [
															{
																$size: "$upvote",
															},
															{
																$size: "$comments",
															},
														],
													},
													1,
												],
											},
											144000000,
										],
									},
									{
										$add: [
											{
												$dateDiff: {
													startDate: "$verifiedAt",
													endDate: new Date(),
													unit: "minute",
												},
											},
											60000,
										],
									},
								],
							},
						},
					},
					{ $sort: sortObject },
					{ $skip: (Number.parseInt(page) - 1) * limit },
					{ $limit: Number.parseInt(limit) },
				],
			});
			response = {
				metadata: result[0].metadata[0],
				data: result[0].data,
			};
		}
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const { postId } = req.params;
		const post = await Post.findById(postId);
		if (post.archived.isArchived)
			return res
				.status(404)
				.json({ message: "Post is archived, user cannot access" });
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const modifyPost = async (req, res) => {
	try {
		const { content } = req.body;
		const postId = req.params.postId;
		// console.log(postId);
		const user = req.user;
		const post = await Post.findById(postId);
		// console.log(post);
		if (post) {
			if (post.createdBy.userId === user.id) {
				post.content = content;
				post.save();
				res.status(204).json("success");
			} else {
				res.status(401).json({ message: "Unauthorized" });
			}
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const post = await Post.findById(postId);
		if (!post)
			return res
				.status(404)
				.json({ message: "post Id is invalid or not found" });

		post.isDeleted = true;
		await post.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteAllPost = async (req, res) => {
	try {
		await Post.deleteMany({});
		res.status(200).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const threadAdminDeletePost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const { threadId } = req.body;
		const user = await User.findById(req.user.id);
		if (!user)
			return res
				.status(404)
				.json({ message: "userId is not found or invalid" });
		if (!threadId) return res.status(400).json({ message: "Bad Request" });
		const post = await Post.findById(postId);
		const thread = await Thread.findById(threadId);
		if (!thread)
			return res.status(404).json({ message: "threadId not found or invalid" });
		if (!post)
			return res.status(404).json({ message: "postId not found or invalid" });
		if (thread.createdBy.userId !== req.user.id)
			return res.status(403).json({ message: "Forbidden" });
		// delete in s3 bucket
		if (post.uploadFile) {
			deleteFileData(post.uploadFile);
		}

		//delete related reference
		user.createdPost.remove(post._id);

		await user.save();

		thread.posts.remove(post._id);
		await thread.save();

		if (post.comments.length > 0) {
			await Comment.deleteMany({ _id: { $in: post.comments } });
		}

		//delete post
		await Post.deleteOne({ _id: post._id });

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const threadAdminGetPosts = async (req, res) => {
	//pagination
	try {
		//filter -> threadId
		//sorting
		let { sort, filter, belongToThread, page, limit } = req.query;
		if (!belongToThread) res.status(400).json({ message: "Bad Request" });
		const thread = await Thread.findById(belongToThread);
		if (!thread)
			res.status(404).json({ message: "threadId not found or invalid" });
		if (thread.createdBy.userId !== req.user.id)
			res.status(403).json({ message: "Unauthorized" });

		const filterCommand = {};

		if (!page) {
			page = "1";
		}
		if (!limit) {
			limit = "10";
		}
		let sortObject = { time: -1 };
		if (sort === "Hot") {
			sortObject = { time: -1 };
		}
		if (sort === "New") {
			sortObject = { createdAt: -1 };
		}
		if (sort === "Top") {
			sortObject = { upvoteLength: -1 };
		}
		if (filter == "unverified") {
			filterCommand.isApproved = false;
		}
		if (belongToThread) {
			filterCommand.belongToThread =
				mongoose.Types.ObjectId.createFromHexString(belongToThread);
		}
		//sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))
		const result = await Post.aggregate([{ $match: filterCommand }]).facet({
			metadata: [
				{ $count: "total" },
				{
					$addFields: {
						page: Number.parseInt(page),
						limit: Number.parseInt(limit),
					},
				},
			],
			data: [
				{
					$addFields: {
						upvoteLength: { $size: "$upvote" },
						commentLength: { $size: "$comments" },
						time: {
							$divide: [
								{
									$multiply: [
										{
											$add: [
												{
													$add: [{ $size: "$upvote" }, { $size: "$comments" }],
												},
												1,
											],
										},
										144000000,
									],
								},
								{
									$add: [
										{
											$dateDiff: {
												startDate: "$createdAt",
												endDate: new Date(),
												unit: "minute",
											},
										},
										60000,
									],
								},
							],
						},
					},
				},
				{ $sort: sortObject },
				{ $skip: (page - 1) * limit },
				{ $limit: Number.parseInt(limit) },
			],
		});
		res.status(200).json({
			metadata: result[0].metadata[0],
			data: result[0].data,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const threadAdminVerifyPost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const { threadId } = req.body;

		if (!threadId)
			res.status(400).json({ message: "ThreadId not found or invalid" });
		const thread = await Thread.findById(threadId);
		if (!thread)
			res.status(404).json({ message: "thread id not found or invalid" });
		if (thread.createdBy.userId != req.user.id)
			res.status(403).json({ message: "Unauthorized" });

		const post = await Post.findById(postId);
		if (!post) res.status(404).json({ message: "post not found or invalid" });
		post.isApproved = true;
		post.verifiedAt = new Date();
		await post.save();
		res.status(204).json("verify success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const postUpVote = async (req, res) => {
	try {
		const postId = req.params.postId;
		if (!postId) return res.status(400).json({ message: "Bad Request" });

		const post = await Post.findById(postId);
		if (!post)
			return res.status(404).json({ message: "post id not found or invalid" });

		post.upvote.push(req.user.id);
		await post.save();
		res.status(204).json("Success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteUpvote = async (req, res) => {
	try {
		const postId = req.params.postId;
		if (!postId) return res.status(400).json({ message: "Bad Request" });

		const post = await Post.findById(postId);
		if (!post) return res.status(404).json("post id not found or invalid");

		post.upvote.remove(req.user.id);
		await post.save();
		res.status(200).json("delete success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const searchPost = async (req, res) => {
	try {
		const searchQuery = req.query.search;

		console.log(res);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const archivePost = async (req, res) => {
	try {
		console.log("check 1");
		const postId = req.params.postId;
		const { threadId } = req.body;
		console.log("check 2");
		if (!postId) return res.status(400).json({ message: "Bad Request" });
		const post = await Post.findById(postId);
		console.log("check 3");
		if (!post)
			return res.status(404).json({ message: "post id not found or invalid" });

		const thread = await Thread.findById(threadId);
		const user = await User.findById(req.user.id);
		// console.log(post)
		if (!user)
			return res
				.status(404)
				.json({ message: "userId is invalid or not found" });

		// console.log(
		// 	`userId: ${user._id}\n, postCreatorId: ${post.createdBy.userId}\n communityAdminId: ${thread.createdBy.userId}`
		// );
		if (
			!(
				req.user.role === "admin" ||
				user._id === post.createdBy.userId ||
				(thread && thread?.createdBy.userId === req.user.id)
			)
		) {
			return res.status(403).json({ message: "Forbidden" });
		}

		post.archived.isArchived = true;
		post.archived.archivedBy = {
			userId: user._id,
			username: user.username,
			profileImage: user.profileImage,
		};
		post.archived.isArchived = true;
		post.archived.archivedBy.userId = user._id;
		post.archived.archivedBy.username = user.username;
		post.archived.archivedBy.profileImage = user.profileImage;
		await post.save();

		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const archivePostByDeactivating = async (req, res) => {
	try {
		const data = req.body;
		// console.log(req.body);
		const postId = req.params.postId;
		if (!postId) return res.status(400).json({ message: "Bad Request" });

		const post = await Post.findById(postId);
		if (!post)
			return res.status(404).json({ message: "post id not found or invalid" });
		post.archived.isArchived = true;
		post.archived.archivedBy = {
			userId: data.userId,
			username: data.username,
			profileImage: data.profileImage,
			isDeactivated: true,
		};
		await post.save();

		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// export const unArchivePost = async (req, res) => {
// 	try {
// 		const postId = req.params.postId;
// 		if (!postId) return res.status(400).json({ message: "Bad Request" });

// 		const post = await Post.findById(postId);
// 		if (!post)
// 			return res.status(404).json({ message: "post id not found or invalid" });

// 		{
// 			/*check who can able to archived post*/
// 		}
// 		const user = await User.findById(req.user.id);
// 		if (!user)
// 			return res
// 				.status(404)
// 				.json({ message: "userId is invalid or not found" });

// 		if (!(req.user.role === "admin" || user._id === post.createdBy.userId))
// 			return res.status(403).json({ message: "Forbidden" });

// 		post.archived.isArchived = false;
// 		post.archived.archivedBy = {
// 			userId: null,
// 			username: null,
// 			profileImage: null,
// 		};
// 		await post.save();

// 		res.status(200).json({ message: "Archived successfully!" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

export const unarchivePost = async (req, res) => {
	try {
		const postId = req.params.postId;
		if (!postId) return res.status(400).json({ message: "Bad Request" });

		const post = await Post.findById(postId);
		if (!post)
			return res.status(404).json({ message: "post id not found or invalid" });

		post.archived.isArchived = false;
		post.archived.archivedBy.userId = null;
		post.archived.archivedBy.username = null;
		post.archived.archivedBy.profileImage = null;

		await post.save();

		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getArchivedPosts = async (req, res) => {
	try {
		const page = Number.parseInt(req.query.page) || 1;
		const limit = Number.parseInt(req.query.limit) || 10;
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
		const posts = await Post.find({ "archived.isArchived": true })
			.select("-password")
			.skip(skip)
			.limit(limit)
			.sort(sortCriteria);
		const totalPosts = await Post.find({
			"archived.isArchived": true,
		}).countDocuments();
		res.status(200).json({ posts, totalPosts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
