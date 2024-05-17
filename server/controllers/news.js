import express from "express";
import News from "../models/News.js";
const app = express();

// CREATE news
export const createNews = async (req, res) => {
    const news = req.body;
	
    try {
        const newItem = await News.create(news);
		console.log(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ news
export const getNews = async (req, res) => {
	try {
		const newsList = await News.find();
		// console.log(newsList);
		res.status(201).json(newsList);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};