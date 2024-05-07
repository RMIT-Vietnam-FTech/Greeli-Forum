import Chat from "../models/Chat.js";

// createChat
export const createChat = async(req, res) => {
    const {firstId, secondId} = req.body
    try {
        const chat = await Chat.findOne({
            members: {$all:[firstId, secondId]}
        })
        if (chat) return res.status(200).json(chat)

        const newChat = new Chat({
            members: [firstId, secondId]
        })
        const response = await newChat.save()
        res.status(201).json(response)
    } catch(error) {
        res.status(500).send({error: "Server Failed"})
    }
}

// getUsersChat
export const findAllChat = async(req, res) => {
    const userId = req.params.userId
    try {
        const response = await Chat.find({
            members: {$in: [userId]}
        })
        res.status(200).json(response)
    } catch(error) {
        res.status(500).send({error: "Server Failed"})
    }
}
// findChat
export const findUserChat = async(req, res) => {
    const {firstId, secondId} = req.params;
    try {
        const response = await Chat.find({
            members: {$all:[firstId, secondId]}
        })
        res.status(200).json(response)
    } catch(error) {
        res.status(500).send({error: "Server Failed"})
    }
} 
