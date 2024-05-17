import axios from "axios";
import React, { useEffect, useRef, useState, useContext} from "react";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LoginPopup from "../../components/Popup/LoginPopup";
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
	const [error, setError] = useState("");
	const [userList, setUserList] = useState([]);
	const [updateChat, setUpdateChat] = useState(0);
	const userId = JSON.parse(user).id;
	const token = cookies.get("TOKEN") || null;
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
	const [showChatBox, setShowChatBox] = useState(false);
	const { isDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		socket.current = io("https://group-project-cosc3060-2024a-ftech.onrender.com");
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
			// console.log(onlineUsers);
		});

		return () => {
			socket.current.off("get-users");
		};
	}, [socket.current]);

	useEffect(() => {
		const getChats = async () => {
			const configuration = {
				method: "get",
				url: `/api/chat/find/${userId}`,
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
					setError(error.response.data.error);
					console.log(error);
				});
		};
		getChats();
	}, [userId, updateChat]);

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

	useEffect(() => {
		const getAllUsers = async () => {
			const configuration = {
				method: "get",
				url: "/api/user/getAll",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			axios(configuration)
				.then((result) => {
					// console.log(result.data);
					setUserList(result.data);
				})
				.catch((error) => {
					setError(error.response.data.error);
					console.log(error);
				});
		};
		getAllUsers();
	}, []);

	useEffect(() => {}, [error]);

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


	const createChat = (user) => {
		const receiverId = user._id;

		const configuration = {
			method: "post",
			url: "/api/chat/create",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: {
				senderId: userId,
				receiverId: receiverId,
			},
		};
		axios(configuration)
			.then((result) => {
				// console.log(result.data);
				setUpdateChat((prev) => prev + 1);
			})
			.catch((error) => {
				setError(error.response.data.error);
				console.log(error);
			});
	};

	return (
		<div className="Chat" data-bs-theme={isDarkMode ? "dark" : "light"}>
			{/* Left Side */}
			{error === "invalid token" && <LoginPopup isShow={true} />}
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
			{/* pop up list friend */}
			<div
				class="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1
								class="modal-title fs-5"
								id="staticBackdropLabel"
							>
								Modal title
							</h1>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div class="modal-body">
							{userList?.map((user) => (
								<div
									className="follower conversation"
									onClick={() => createChat(user)}
									key={user?._id}
								>
									<div>
										<img
											src=""
											alt=""
											className="followerImage"
											style={{
												width: "50px",
												height: "50px",
											}}
										/>
										<div
											className="name"
											style={{ fontSize: "0.8rem" }}
										>
											<span>{user?.username}</span>
										</div>
									</div>
								</div>
							))}
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" class="btn btn-primary">
								Understood
							</button>
						</div>
					</div>
				</div>
			</div>
			{error && <LoginPopup isShow={true} />}
		</div>
	);
};

export default Chat;
