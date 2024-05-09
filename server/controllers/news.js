import express from "express";
import News from "../models/News";

const app = express();

export const getNews = async (req, res) => {
	try {
        const newsList = await News.find();
        res.status(201).json(newsList);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};