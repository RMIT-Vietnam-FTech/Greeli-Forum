import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(201).json({
            _id: newFeedback._id,
            message: "success",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}