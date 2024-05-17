import axios from "axios";
import React, { useEffect, useRef, useState, useContext} from "react";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import { useUserContext } from "../../context/UserContext";
import "./chat.css";
import { ThemeContext } from '../../context/ThemeContext'



const Chat = () => {
	const socket = useRef();
	const cookies = new Cookies();
	const { user } = useUserContext();
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [sendMessage, setSendMessage] = useState(null);
	const [receiveMessage, setReceiveMessage] = useState(null);
	const userId = JSON.parse(user).id;
	const token = cookies.get("TOKEN") || null;
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
	const [showChatBox, setShowChatBox] = useState(false);
	const { isDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		socket.current = io("http://localhost:3001");
		socket.current.connect();
		return () => {
			socket.current.disconnect();
		};
	}, [user]);

	useEffect(() => {
		if (socket.current === null) return;
		socket.current.emit("new-user-add", userId);
		socket.current.on("get-users", (activeUsers) => {
			setOnlineUsers(activeUsers);
			console.log(onlineUsers);
		});

		return () => {
			socket.current.off("get-users");
		};
	}, [socket.current]);

	useEffect(() => {
		const getChats = async () => {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/chat/find/${userId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			axios(configuration)
				.then((result) => {
					setChats(result.data);
				})
				.catch((error) => {
					console.log(error.response.data);
				});
		};
		getChats();
	}, [userId, token]);

	useEffect(() => {
		if (socket.current === null) return;
		if (sendMessage !== null) {
			socket.current.emit("send-message", sendMessage);
		}
		return () => {
			socket.current.off("send-message");
		};
	}, [sendMessage]);

	useEffect(() => {
		if (socket.current === null) return;
		socket.current.on("receive-message", (data) => {
			setReceiveMessage(data);
		});
		return () => {
			socket.current.off("receive-message");
		};
	}, [socket.current]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const checkOnlineStatus = (chat) => {
		const chatMember = chat.members.find((member) => member !== userId);
		const online = onlineUsers.find((user) => user.userId === chatMember);
		return !!online;
	};

	const handleChatClick = (chat) => {
		setCurrentChat(chat);
		if (isMobileView) {
			setShowChatBox(true);
		}
	};

	const handleBackClick = () => {
		setShowChatBox(false);
	};

	return (
		<div className="Chat" data-bs-theme={isDarkMode ? "dark" : "light"}>
			{/* Left Side */}
			<div className={`Left-side-chat ${isMobileView && showChatBox ? 'd-none' : 'd-full'} ${isDarkMode ? "Left-side-chat-dark" : "Left-side-chat-light"}`}>
				<div className="Chat-container">
					<h2 className={`${isDarkMode ? "title-dark" : "title-light"}`}>GREELI CHAT</h2>
					<div className="Chat-list">
						{chats?.map((chat, index) => (
							<div
								onClick={() => handleChatClick(chat)}
								key={index}
								className={currentChat === chat ? 'active' : ''}
							>
								<Conversation
									data={chat}
									currentUserId={userId}
									online={checkOnlineStatus(chat)}
									isActive={currentChat === chat}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Side */}
			<div className={`Right-side-chat ${isMobileView && !showChatBox ? 'd-none' : 'd-full'}`}>
				{isMobileView && showChatBox && (
					<button className="back-button" onClick={handleBackClick}>
						<i className="fas fa-arrow-left"></i>
					</button>
				)}
				<ChatBox
					chat={currentChat}
					currentUserId={userId}
					setSendMessage={setSendMessage}
					receiveMessage={receiveMessage}
				/>
			</div>
		</div>
	);
};

export default Chat;
