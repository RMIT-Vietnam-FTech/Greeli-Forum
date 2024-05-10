import Thread from "../models/Thread.js";
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
export const getThreads = async (req, res)=>{
	try{
		
	}
	catch(error){

	}
}

export const getThread = async (req, res)=>{
	try{
		
	}
	catch(error){

	}
}

export const modifyThreadContent = async (req, res)=>{
	//for thread admin only
	try{

	}
	catch(error){

	}
}

export const getThreadRules = async (req, res)=>{
	try{

	}
	catch(error){

	}
}

export const createThreadRule = async (req, res)=>{
	//for thread admin only
	try{

	}
	catch(error){

	}
}

export const modifyThreadRule = async (req, res)=>{
	//for thread admin only
	try{

	}
	catch(error){

	}
}

export const deleteThreadRule = async (req, res)=>{
	//for thread admin only
	try{

	}
	catch(error){

	}
}
import dotenv from "dotenv";
dotenv.config();

