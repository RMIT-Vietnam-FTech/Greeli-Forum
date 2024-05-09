import Message from "../models/Message.js";

// createMessage
export const createMessage = async (req, res) => {
	const { chatId, senderId, text } = req.body;
	try {
		const message = new Message({
			chatId,
			senderId,
			text,
		});
		const response = await message.save();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

// getMessage
export const getMessages = async (req, res) => {
	const { chatId } = req.params;
	try {
		const messages = await Message.find({ chatId });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json(error);
	}
};
