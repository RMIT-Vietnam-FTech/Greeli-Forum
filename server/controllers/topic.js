import Topic from "../models/Topic.js";

// CREATE Topic
export const createTopic = async (req, res) => {
  try {
    const {title, threads} = req.body;
    const newTopic = new Topic({
        title : title,
        threads : threads,
    }
    );
    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Topics
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}).populate({path:'threads', select:'title'}).exec();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Topic by ID
export const getTopic= async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
