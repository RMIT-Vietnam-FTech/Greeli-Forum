import Thread from "../models/Thread.js";
import User from "../models/User.js";
import Topic from "../models/Topic.js";
import * as crypto from 'crypto';
import { deleteFileData, uploadFileData } from "../service/awsS3.js";
const createRandomName = (bytes = 32) =>
	crypto.randomBytes(32).toString("hex");

export const createThread = async (req, res) => {
  //req.body -> title, content, createBy{}
  try {
    const { title, content, topics } = req.body;
    const uploadFile = req.file;
    // console.log(
    //   `check input: \n file: ${req.file} \n body: ${JSON.stringify(req.body)}`
    // );
    if (req.user) {
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
        uploadFile.createdBy.profileImage = user.profileImage;
      }
      if (uploadFile) {
		const imageName = createRandomName();
		console.log(imageName);
        uploadFileData(uploadFile.buffer, imageName, uploadFile.mimetype);
        uploadObject.uploadFile = `https://d46o92zk7g554.cloudfront.net/${imageName}`;
      }
      const thread = await Thread.create(uploadObject);
      if (topics) {
        for (let i = 0; i < topics.length; ++i) {
          const topic = await Topic.findOne({ title: topics[i]});
          topic.threads.push(thread._id);
          await topic.save();
        }
      }
      res.location(`localhost:3001/api/v1/threads/${thread._id}`);
      res.status(204).json("Create success");
    } else {
      res.status(403).json("Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
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
export const reset = async (req, res)=>{
	await Thread.deleteMany({});
  await Topic.deleteMany({});
  await Topic.create({title:"Health"});
  await Topic.create({title:"Transportation"});
  await Topic.create({title:"Environment"});
  await Topic.create({title:"Energy"});
  await Topic.create({title:"Food"});
  await Topic.create({title:"Climate Change"});
  res.status(200).json("success");
}
import dotenv from "dotenv";
dotenv.config();
