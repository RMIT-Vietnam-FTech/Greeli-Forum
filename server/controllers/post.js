import crypto from "crypto";
import Post from "../models/Post";

import { deleteFile, uploadFile } from "../service/awsS3.js";

const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

export const createPost = async (req, res) => {
	//req.body -> title, content, createBy{}
	const { title, content, uploadFile, threadId } = req.body;
	const user = req.user;
	if (user) {
		const uploadObject = {};
		uploadObject.title = title;
		uploadObject.content = content;
		uploadObject.createBy = {
			userId: user._id,
			username: user.username,
			profileImage: user.profileImage,
		};
		uploadObject.belongToThread = threadId;
		if (uploadFile) {
			const imageName = createRandomName();
			uploadFile(uploadFile.buffer, imageName, uploadFile.mimetype);
			uploadObject.uploadFile =
				"https://d46o92zk7g554.cloudfront.net" + imageName;
		}
		const post = new Post({ uploadObject });
		await post.save();
		res.status(204);
		res.location("localhost:9000/api/v1/posts/" + post._id);
	} else {
		res.send(403).json("Forbidden");
	}
	try {
	} catch (error) {
		res.send(500).json({ message: error.message });
	}
};

export const getPosts = async (req, res) => {
	//pagination
	try {
		//filter -> threadId
		const { threadId } = req.query;
		const filter = {};
		if (threadId) {
			filter.belongToThread = threadId;
		}
		const posts = await Post.aggregate().match({ filter }).facet().sort();
		//sorting ( on upvote length, on createTime, trendy -> (upvote + comment)/(now-createTime))

		//pipeline -> pagination
	} catch (error) {}
};

export const getPost = async (req, res) => {
	try {
		const post = await Post.find();
	} catch (error) {}
};

export const modifyPost = async (req, res) => {
	try {
		const { postId, content } = req.body;
		const user = req.user;
		const post = await Post.findById({ postId });
		if (post) {
			if (post.createBy.userId == user._id) {
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
			if (post.createBy.userId == user._id) {
				deleteFile(post.uploadFile);
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

app.get("/", async (req, res) => {
	//post.imageUrl = await getObjectSignedUrl(post.imageName)
});
