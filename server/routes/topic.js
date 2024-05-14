import Topic from "../models/Topic.js";
import express from 'express';
import { createTopic, getTopic, getTopicById } from "../controllers/topic.js";
 
const routes = express.Router();

routes.get('/get', getTopic);
routes.get('/get/topicId', getTopicById);
routes.post('/create', createTopic);

export default routes;

