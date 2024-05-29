import { Socket } from "dgram";
import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
	connectionStateRecovery: {},
});

let activeUsers = [];

io.on("connection", (socket) => {
	// add new User
	socket.on("new-user-add", (newUserId) => {
		// if user is not added previously
		if (!activeUsers.some((user) => user.userId === newUserId)) {
			activeUsers.push({ userId: newUserId, socketId: socket.id });
			console.log("New User Connected", activeUsers);
		}
		// send all active users to new user
		io.emit("get-users", activeUsers);
	});

	// send message to a specific user
	socket.on("send-message", (data) => {
		const { receiverId } = data;
		const user = activeUsers.find((user) => user.userId === receiverId);
		console.log("Sending from socket to :", user);
		console.log("Data: ", data);
		if (user) {
			io.to(user.socketId).emit("receive-message", data);
			io.to(user.socketId).emit("get-notification", {
				chatId: data.chatId,
				senderId: data.senderId,
				isRead: false,
				date: new Date(),
			});
			console.log("send successfully");
		}
	});

	socket.on("disconnect", () => {
		// remove user from active users
		activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
		console.log("User Disconnected", activeUsers);
		// send all active users to all users
		io.emit("get-users", activeUsers);
	});
});

export { app, io, server };
