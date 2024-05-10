import React, { useEffect, useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./chat.css";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { io } from "socket.io-client"
import Conversation from "../../components/Conversation/Conversation";
const Chat = () => {
	const socket = useRef()
	const { user } = useUserContext();
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [sendMessage, setSendMessage] = useState(null);
	const [receiveMessage, setReceiveMessage] = useState(null);
	const userId = JSON.parse(user).id;
	// console.log(onlineUsers);

	useEffect(() => {
		socket.current = io("http://localhost:3001");
		socket.current.connect();
		return () => {
			socket.current.disconnect();
		}
	}, [user])

	// add current user to socket and receive list of online users
	useEffect(() => {
		if (socket.current === null) return;
		socket.current.emit("new-user-add", userId);
		socket.current.on("get-users", (activeUsers) => {
			setOnlineUsers(activeUsers);
			console.log(onlineUsers)
		})

		return () => {
			socket.current.off("getOnlineUsers");
		}
	}, [socket.current])

	useEffect(() => {
		const getChats = async () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/chat/find/${userId}`,
			};
			axios(configuration)
				.then((result) => {
					// console.log(result.data);
					setChats(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		getChats();
	}, [userId]);

	// sending mesage to socket server
	useEffect(() => {
		if (socket.current === null) return;
		if (sendMessage !== null) {
			socket.current.emit("send-message", sendMessage)
			console.log(sendMessage)
		}
		return () => {
			socket.current.off("send-message")
		}
	}, [sendMessage])
	
	// receive mesage from socket server
	useEffect(() => {
		if (socket.current === null) return;

		socket.current.on("receive-message", (data) => {
			setReceiveMessage(data)
			console.log(receiveMessage)
		})
		return () => {
			socket.current.off("receive-message")
		}
	}, [socket.current, chats])

	const checkOnlineStatus = (chat) => {
		const chatMember = chat.members.find((member) => member !== userId)
		const online = onlineUsers.find((user) => user.userId === chatMember)
		return online ? true : false
	}
	return (
		<div className="Chat">
			{/* Left Side */}
			<div className="Left-side-chat">
				<div className="Chat-container">
					<h2>Chat</h2>
					<div className="Chat-list">
						Conversations
						{chats?.map((chat) => (
							<div onClick={() => setCurrentChat(chat)}>
								<Conversation
									data={chat}
									currentUserId={userId}
									online={checkOnlineStatus(chat)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Right Side */}
			<div className="Right-side-chat">
				<div style={{ width: "20rem" }}>Some navbar?</div>
				{/* Chatbody */}
				<ChatBox chat={currentChat} currentUserId={userId} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
			</div>
		</div>
	);
};
export default Chat;
