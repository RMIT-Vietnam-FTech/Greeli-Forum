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
// My task here
// CREATE rule
export const createThreadRule = async (req, res) => {
  //for thread admin only
 	 const threadId = req.params.threadId;
	 const newRule = req.body;
 	 try {
     	const thread = await Thread.findByIdAndUpdate(threadId, {$push: {rule: newRule}}, { new: true });
     	if (!thread) return res.status(404).json({ message: "Thread not found" });
		await thread.save();
		res.status(201).json(thread.rule);
   	} catch (error) {
     	res.status(500).json({ error: error.message });
   	}
};
// GET all rules
export const getThreadRules = async (req, res) => {
	//for thread admin only
	const threadId = req.params.threadId;
	try {
		const thread = await Thread.findById(threadId);
		if (!thread) return res.status(404).json({ message: "Thread not found" });
		res.status(200).json(thread.rule);
	} catch (error) {
     res.status(500).json({ error: error.message });
   	}
};

// EDIT rule
export const modifyThreadRule = async (req, res) => {
	//for thread admin only
	const threadId = req.params.threadId;
	const ruleId = req.query.ruleId;
	const { title, description } = req.body; 
  	try {
	    const thread = await Thread.findById(threadId);
		if (!thread) return res.status(404).json({ message: "Thread not found" });
		//update rule
		thread.rule[ruleId].title = title;
        thread.rule[ruleId].description = description;
        await thread.save();
        res.status(204).json(thread.rule[ruleId]);
  	} catch (error) {
     res.status(500).json({ error: error.message });
   	}
};
//DELETE specific rule
export const deleteThreadRuleByRuleIndex = async (req, res) => {
	//for thread admin only
	const threadId  = req.params.threadId;
	const ruleId = req.query.ruleId;
  	try {
      const thread = await Thread.findById(threadId);
      if (!thread) return res.status(404).json({ message: "Thread not found" });
	  
	  //delete rule
	  thread.rule.splice(ruleId, 1);
	  await thread.save();
	  res.status(204).json({ message: "Delete rule !" });;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
// DELETE all rule
export const deleteThreadRule = async (req, res) => {
	//for thread admin only
	const threadId  = req.params.threadId;
  	try {
      const thread = await Thread.findByIdAndDelete(threadId, { $set: { rule: "" } }, { new: true });
      if (!thread) return res.status(404).json({ message: "Thread not found" });
	  //delete rule
	  await thread.save();
	  res.status(204).json({ message: "Delete rule !" });;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
dotenv.config();
