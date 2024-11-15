import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import SignIn from "../../components/Popup/SignIn";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "./chat.css";
axios.defaults.withCredentials = true;
const Chat = () => {
	const socket = useRef();
	const { user, error, setError, chatNoti, setChatNoti } = useUserContext();
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [sendMessage, setSendMessage] = useState(null);
	const [receiveMessage, setReceiveMessage] = useState(null);
	const [userList, setUserList] = useState([]);
	const [updateChat, setUpdateChat] = useState(0);
	const userId = JSON.parse(user).id;
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
	const [showChatBox, setShowChatBox] = useState(false);
	const { isDarkMode } = useContext(ThemeContext);
	const [userInChatId, setUserInChatId] = useState([]);
	const [userNotInChat, setUserNotInChat] = useState([]);
	const [query, setQuery] = useState("");

	console.log("notification", chatNoti);

	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	useEffect(() => {
		socket.current = io("http://localhost:3000");
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
	}, [socket.current]);

	useEffect(() => {
		const getChats = async () => {
			const configuration = {
				method: "get",
				url: baseUrl + `/api/chat/find/${userId}`,
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			};
			axios(configuration)
				.then((result) => {
					// popupContext.setIsPopup(false);
					setChats(result.data);
				})
				.catch((error) => {
					setError(error.response.data.error);
					console.log(error);
				});
		};
		getChats();
	}, [userId, updateChat, error, receiveMessage]);

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
			console.log(data);
		});
		socket.current.on("get-notification", (data) => {
			const isChatOpen = currentChat?.members.some(
				(id) => id === data.senderId,
			);
			if (isChatOpen) {
				setChatNoti((prev) => [{ ...data, isRead: true }, ...prev]);
			} else {
				setChatNoti((prev) => [data, ...prev]);
			}
		});
		return () => {
			socket.current.off("receive-message");
			socket.current.off("get-notification");
		};
	}, [socket.current, currentChat]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const getAllUsers = async () => {
			const configuration = {
				method: "get",
				url: baseUrl + "/api/user/getAll",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			};
			axios(configuration)
				.then((result) => {
					// console.log(result.data);
					setUserList(result.data.users);
				})
				.catch((error) => {
					setError(error.response.data.error);
					console.log(error);
				});
		};
		getAllUsers();
	}, [error]);

	useEffect(() => {
		setUserInChatId(chats?.map((chat) => chat.members[1]));
		setUserInChatId((prev) => [...prev, userId]);
		// userInChatId
		setUserNotInChat(
			userList.filter((user) => !userInChatId.includes(user._id)),
		);

		// console.log(
		// 	userList.filter((user) => !userInChatId?.includes(user._id)),
		// );
		// console.log(userInChatId);
	}, [chats, userList, updateChat]);

	// useEffect(() => {
	// 	set
	// }, [query])

	const checkOnlineStatus = (chat) => {
		const chatMember = chat?.members.find((member) => member !== userId);
		const online = onlineUsers.find((user) => user.userId === chatMember);
		return !!online;
	};

	const handleChatClick = (chat) => {
		setCurrentChat(chat);
		chatNoti
			.filter((noti) => noti.chatId === chat._id)
			.map((noti) => (noti.isRead = true));
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
			url: baseUrl + "/api/chat/create",
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
			data: {
				senderId: userId,
				receiverId: receiverId,
			},
			withCredentials: true,
		};
		axios(configuration)
			.then((result) => {
				// console.log(result.data);
				toast.success("Create chat successfully!", {
					duration: 2000,
					position: "top-center",
				});
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
			{/* {error === "invalid token" && <SignIn isShow={true} />} */}
			<div
				className={`Left-side-chat ${
					isMobileView && showChatBox ? "d-none" : "d-full"
				} ${
					isDarkMode ? "Left-side-chat-dark" : "Left-side-chat-light"
				}`}
			>
				<div className="Chat-container">
					<div className="conversation-title">
						<h2
							className={`${
								isDarkMode ? "title-dark" : "title-light"
							}`}
						>
							GREELI CHAT
						</h2>
						<button
							type="button"
							className="create-chat-button"
							data-bs-toggle="modal"
							data-bs-target="#staticBackdrop"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								fill="currentColor"
								className="bi bi-person-add"
								viewBox="0 0 16 16"
								// fix biome by Bread, you can delete if it causes error
								// fix start
								role="button"
								aria-label="creat chat button"
								// fix end
							>
								<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
								<path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
							</svg>
						</button>
					</div>

					<div className="Chat-list">
						{chats?.map((chat, index) => (
							<div
								onClick={() => handleChatClick(chat)}
								key={index}
								className={currentChat === chat ? "active" : ""}
							>
								<Conversation
									data={chat}
									currentUserId={userId}
									online={checkOnlineStatus(chat)}
									isActive={currentChat === chat}
									chatNoti={chatNoti.filter(
										(noti) => noti.chatId === chat._id,
									)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Side */}
			<div
				className={`Right-side-chat ${
					isMobileView && !showChatBox ? "d-none" : "d-full"
				}`}
			>
				<ChatBox
					chat={currentChat}
					currentUserId={userId}
					setSendMessage={setSendMessage}
					receiveMessage={receiveMessage}
					handleBackClick={handleBackClick}
					online={checkOnlineStatus(currentChat)}
				/>
			</div>
			{/* pop up list friend */}
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel"
							>
								Click to create chat
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<input
								type="text"
								placeholder="Search..."
								className="search"
								onChange={(e) => setQuery(e.target.value)}
							/>
							{userNotInChat
								?.filter((user) =>
									user.username.toLowerCase().includes(query),
								)
								.map((user) => (
									<div
										className="follower conversation"
										onClick={() => createChat(user)}
										key={user?._id}
										data-bs-dismiss="modal"
									>
										<div>
											<img
												src={user?.profileImage}
												alt="User profile image"
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
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			{error && <SignIn isShow={true} />}
		</div>
	);
};

export default Chat;
