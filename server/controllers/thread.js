import Thread from "../models/Thread.js";
import dotenv from "dotenv";

export const createThread = async (req, res) => {
	try {
		// const {title, username, userImage} = req.body;
		const newThread = new Thread(req.body);
		const savedThread = await newThread.save();
		res.status(201).json(savedThread);
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
