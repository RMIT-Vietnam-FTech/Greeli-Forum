import * as crypto from "crypto";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Thread from "../models/Thread.js";
import Topic from "../models/Topic.js";
import User from "../models/User.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";

import { error } from "console";
import dotenv from "dotenv";
dotenv.config();

const createRandomName = (bytes = 32) => crypto.randomBytes(32).toString("hex");

export const createThread = async (req, res) => {
	try {
		const { title, content } = req.body;
		const uploadFile = req.file;
		if (req.user) {
			console.log(`check 2`);
			const user = await User.findById(req.user.id);
			const uploadObject = {};
			uploadObject.title = title;

			if (content !== "null") {
				uploadObject.content = content;
			}

			uploadObject.createdBy = {
				userId: user._id,
				username: user.username,
			};

			if (user.profileImage) {
				uploadObject.createdBy.profileImage = user.profileImage;
			}

			if (uploadFile) {
				uploadObject.uploadFile = {
					src: null,
					type: null,
				};
				const imageName = createRandomName();
				const uploadFileMetaData = await fileTypeFromBuffer(
					uploadFile.buffer,
				);
				const uploadFileMime = uploadFileMetaData.mime.split("/")[0];

				if (uploadFileMime === "image") {
					const fileBuffer = await sharp(uploadFile.buffer)
						.jpeg({ quality: 100 })
						.resize(1000)
						.toBuffer();
					await uploadFileData(
						fileBuffer,
						imageName,
						uploadFile.mimetype,
					);
					console.log(uploadFileMime);
					uploadObject.uploadFile.type = uploadFileMime;
				} else {
					await uploadFileData(
						uploadFile.buffer,
						imageName,
						uploadFile.mimetype,
					);
					uploadObject.uploadFile.type = uploadFileMime;
				}
				uploadObject.uploadFile.src = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
			}

			const thread = await Thread.create(uploadObject);

			user.createdThread.push(thread._id);
			await user.save();

			res.status(201).json(thread._id);
		} else {
			res.status(403).json({ message: "Forbidden" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const getThreads = async (req, res) => {
	try {
		const { topicName } = req.query;
		const filter = {};
		if (topicName) {
			const topic = await Topic.findOne({ title: topicName });
			if (!topic)
				return res
					.status(404)
					.json({ message: "Topic id is not found or invalid" });
			filter._id = { $in: topic.threads };
		}
		const threads = await Thread.find(filter);
		res.status(200).json(threads);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getThread = async (req, res) => {
	try {
		const threadId = req.params.threadId;
		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "threadId is not found or invalid" });
		res.status(200).json(thread);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getArchivedThreads = async (req, res) => {
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
		const threads = await Thread.find({ "archived.isArchived": true })
			.select("-password")
			.skip(skip)
			.limit(limit)
			.sort(sortCriteria);
		const totalThreads = await Thread.find({
			"archived.isArchived": true,
		}).countDocuments();
		res.status(200).json({ threads, totalThreads });
		console.log(threads);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const modifyThreadContent = async (req, res) => {
	//for thread admin only
	try {
		const { content } = req.body;
		// console.log("req.user: " + req.user);
		const threadId = req.params.threadId;
		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "threadId is not found or invalid" });
		if (thread.createdBy.userId !== req.user.id)
			return res.status(403).json({ message: "Unauthorized!" });
		thread.content = content;
		await thread.save();
		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const getThreadStatistic = async (req, res) => {
	try {
		const threadId = req.params.threadId;
		const thread = await Thread.findById(threadId, {
			createdBy: 1,
			followedBy: 1,
		});
		const posts = await Post.find({
			belongToThread: threadId,
			isApproved: true,
		});
		if (!thread)
			return res
				.status(404)
				.json({ message: "threadId is not found or invalid" });

		res.status(200).json({
			member: thread.followedBy.length,
			post: posts.length,
			admin: {
				username: thread.createdBy.username,
				profileImage: thread.createdBy.profileImage,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const validateThread = async (req, res) => {
	try {
		const { title } = req.body;
		const validatedTitle = title.toLowerCase().replace(/\s/g, "");
		const thread = await Thread.findOne({ title: validatedTitle });
		if (thread)
			return res
				.status(403)
				.json({ message: `${title} is already exist` });
		return res.status(200).json("success");
	} catch (e) {
		res.status(500).json({ message: error.message });
	}
};
export const reset = async (req, res) => {
	await Thread.deleteMany({});
	await Post.deleteMany({});
	await Comment.deleteMany({});
	await Topic.deleteMany({});
	// console.log("userId: " + req.user.id);
	const user = await User.findById(req.user.id);
	await User.updateMany(
		{ _id: req.user.id },
		{ $pull: { createdPost: { $in: user.createdPost } } },
	);
	await User.updateMany(
		{ _id: req.user.id },
		{ $pull: { createdThread: { $in: user.createdThread } } },
	);
	await User.updateMany(
		{ _id: req.user.id },
		{ $pull: { followThread: { $in: user.followThread } } },
	);
	await User.updateMany(
		{ _id: req.user.id },
		{ $pull: { archivedPost: { $in: user.archivedPost } } },
	);
	await Topic.create({ title: "Transportation" });
	await Topic.create({ title: "Environment" });
	await Topic.create({ title: "Energy" });
	await Topic.create({ title: "Food" });
	await Topic.create({ title: "Climate Change" });
	res.status(200).json();
};

// My task here
// CREATE rule
export const createThreadRule = async (req, res) => {
	//for thread admin only
	try {
		const threadId = req.params.threadId;
		if (threadId.createdBy.userId !== req.user.id)
			res.status(403).json({ message: "Unauthorized" });
		const { title, description } = req.body;
		if (!(title && description))
			res.status(400).json({ message: "Bad Request" });
		const newRule = {
			title: title,
			description: description,
		};
		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "threadId not found or invalid" });
		thread.rule.push(newRule);
		await thread.save();

		res.status(201).json("create is succeed");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// EDIT rule
export const modifyThreadRule = async (req, res) => {
	//for thread admin only
	try {
		const threadId = req.params.threadId;
		const ruleIndex = req.params.ruleIndex;
		const { title, description } = req.body;

		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "threadId not found or invalid" });
		if (thread.createdBy.userId !== req.user.id)
			return res.status(403).json({ message: "Unauthorized" });

		//update rule
		thread.rule[ruleIndex - 1].title = title;
		thread.rule[ruleIndex - 1].description = description;
		await thread.save();

		res.status(204).json("success");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
//DELETE specific rule
export const deleteThreadRule = async (req, res) => {
	//for thread admin only
	const threadId = req.params.threadId;
	const ruleIndex = req.query.ruleIndex;
	try {
		const thread = await Thread.findById(threadId);
		if (!thread)
			return res.status(404).json({ message: "Thread not found" });
		if (thread.createdBy.userId !== req.user.id)
			return res.status(403).json({ message: "Unauthorized" });

		//delete rule
		thread.rule.splice(ruleIndex - 1, 1);
		await thread.save();

		res.status(204).json({ message: "Delete rule success" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const archiveThread = async (req, res) => {
	try {
		const threadId = req.params.threadId;
		if (!threadId) return res.status(400).json({ message: "Bad Request" });

		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "Thread id not found or invalid" });
		thread.isHidden = true;
		if (!thread)
			return res
				.status(404)
				.json({ message: "Thread id not found or invalid" });
		thread.archived.isArchived = true;
		await thread.save();
		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const unarchiveThread = async (req, res) => {
	try {
		const threadId = req.params.threadId;
		if (!threadId) return res.status(400).json({ message: "Bad Request" });

		const thread = await Thread.findById(threadId);
		if (!thread)
			return res
				.status(404)
				.json({ message: "Thread id not found or invalid" });
		thread.archived.isArchived = false;
		thread.archived.archivedBy = {
			userId: null,
			username: null,
			isDeactivated: false,
			profileImage: null,
		};
		await thread.save();
		res.status(200).json({ message: "Archived successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
