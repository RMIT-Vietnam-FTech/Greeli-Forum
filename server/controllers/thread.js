import Thread from "../models/Thread.js";
import User from "../models/User.js";
import { deleteFileData, uploadFileData } from "../service/awsS3.js";
const createRandomName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");

export const createThread = async (req, res) => {
	//req.body -> title, content, createBy{}
	try {
		const { title, content, uploadFile } = req.body;
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
				uploadFile.createdBy.profileImage = user.profileImage;
			}
			if (uploadFile) {
				const imageName = createRandomName();
				uploadFileData(
					uploadFile.buffer,
					imageName,
					uploadFile.mimetype,
				);
				uploadObject.uploadFile = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
			}
			const thread = new Thread(uploadObject);
			await thread.save();
			res.location(`localhost:9000/api/v1/threads/${thread._id}`);
			res.status(204).json("Create success");
		} else {
			res.status(403).json("Forbidden");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export const getThreads = async (req, res) => {
	try {
	} catch (error) {}
};

export const getThread = async (req, res) => {
	try {
	} catch (error) {}
};

export const modifyThreadContent = async (req, res) => {
	//for thread admin only
	try {
	} catch (error) {}
};

export const getThreadRules = async (req, res) => {
	try {
	} catch (error) {}
};

export const createThreadRule = async (req, res) => {
	//for thread admin only
	try {
	} catch (error) {}
};

export const modifyThreadRule = async (req, res) => {
	//for thread admin only
	try {
	} catch (error) {}
};

export const deleteThreadRule = async (req, res) => {
	//for thread admin only
	try {
	} catch (error) {}
};
import dotenv from "dotenv";
dotenv.config();
