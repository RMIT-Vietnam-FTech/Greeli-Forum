import Thread from "../models/Thread.js";
export const createThread = async (req, res) => {
	try {
		// const {title, username, userImage} = req.body;
		const newThread = new Thread(req.body);
		const savedThread = newThread.save();
		res.status(201).json(savedThread);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
