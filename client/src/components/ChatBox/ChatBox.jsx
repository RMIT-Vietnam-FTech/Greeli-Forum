import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./ChatBox.css";
import moment from "moment";
import { ThemeContext } from "../../context/ThemeContext";
axios.defaults.withCredentials = true;

const ChatBox = ({
	chat,
	currentUserId,
	setSendMessage,
	receiveMessage,
	handleBackClick,
	online,
}) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const chatBodyRef = useRef();
	const emojiPickerRef = useRef();
	const { isDarkMode } = useContext(ThemeContext);

	useEffect(() => {
		const fetchMessagesAndUser = async () => {
			const receiverId = chat.members.find((id) => id !== currentUserId);
			const userConfig = {
				method: "get",
				url: `http://localhost:3001/api/user/find/${receiverId}`,
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
			};
			const messagesConfig = {
				method: "get",
				url: `http://localhost:3001/api/message/find/${chat._id}`,
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
			};
			try {
				const userResponse = await axios(userConfig);
				const messagesResponse = await axios(messagesConfig);
				setUserData(userResponse.data);
				setMessages(messagesResponse.data);
			} catch (error) {
				console.log(error);
			}
		};
		if (chat) fetchMessagesAndUser();
	}, [chat, currentUserId]);

	const handleChange = (e) => setNewMessage(e.target.value);

	const handleSend = async (e) => {
		e.preventDefault();
		const message = {
			chatId: chat._id,
			senderId: currentUserId,
			text: newMessage,
		};
		const configuration = {
			method: "post",
			url: "http://localhost:3001/api/message/create",
			data: message,
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
		};

		const receiverId = chat.members.find((id) => id !== currentUserId);
		setSendMessage({ ...message, receiverId });
		axios(configuration)
			.then((result) => {
				console.log(result);
				setMessages([...messages, result.data]);
				setNewMessage("");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		console.log("Message Arrived: ", receiveMessage);
		if (receiveMessage !== null && receiveMessage?.chatId === chat._id) {
			console.log("Data receive");
			setMessages([...messages, receiveMessage]);
		}
	}, [receiveMessage]);

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSend(event);
		}
	};

	const addEmoji = (emoji) => {
		setNewMessage((prevMessage) => prevMessage + emoji.native);
	};

	useEffect(() => {
		if (chatBodyRef.current) {
			chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
		}
	}, [messages]);

	// Handle click outside emoji picker
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target)
			) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [emojiPickerRef]);

	return (
		<div
			className="ChatBox-container"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			{chat ? (
				<>
					<div
						className={`${
							isDarkMode
								? "chat-header-dark"
								: "chat-header-light"
						} chat-header`}
					>
						{userData && (
							<>
								<img
									src={
										userData.profilePicture ||
										"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"
									}
									alt={userData.username}
									className={`followerImage ${
										online ? "online" : "offline"
									}`}
								/>
								<span className="fw-bold">
									{userData.username}
								</span>
								<button
									type="button"
									className={`${
										isDarkMode
											? "return-button-dark"
											: "return-button-light"
									} return-button`}
									onClick={handleBackClick}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-arrow-left"
										viewBox="0 0 16 16"
									>
										<path
											fill-rule="evenodd"
											d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
										></path>
									</svg>
								</button>
							</>
						)}
					</div>
					<div
						className={`${
							isDarkMode ? "chat-body-dark" : "chat-body-light"
						} chat-body`}
						ref={chatBodyRef}
					>
						{messages.map((message, index) => (
							<div
								key={index}
								className={`message ${
									message.senderId === currentUserId
										? "own"
										: "other"
								} ${isDarkMode ? "own-dark" : "own-light"}`}
							>
								<div className="message-text">
									{message.text}
								</div>
								<div className="message-time">
									{moment(message.createdAt).format("LT")}
								</div>
							</div>
						))}
					</div>
					<div
						className={`${
							isDarkMode
								? "chat-sender-dark"
								: "chat-sender-light"
						} chat-sender`}
					>
						<textarea
							value={newMessage}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							placeholder="Type a message"
							className={`${
								isDarkMode
									? "form-control-dark"
									: "form-control-light"
							} form-control`}
						/>
						<div
							className="emoji-picker-container"
							ref={emojiPickerRef}
						>
							{showEmojiPicker && (
								<Picker data={data} onEmojiSelect={addEmoji} />
							)}
						</div>
						<button
							className={`${
								isDarkMode
									? "emoji-button-dark"
									: "emoji-button-light"
							} emoji-button`}
							onClick={() => setShowEmojiPicker(!showEmojiPicker)}
						>
							😊
						</button>
						<button
							className={`${
								isDarkMode
									? "send-button-dark"
									: "send-button-light"
							} send-button`}
							onClick={handleSend}
						>
							➤
						</button>
					</div>
				</>
			) : (
				<div
					className={`${
						isDarkMode
							? "bg-dark text-light"
							: "bg-light text-primary-green"
					} before`}
				>
					<img
						className={`${
							isDarkMode ? "DarkLogo" : "LightLogo"
						} logo`}
						src={`${isDarkMode ? "DarkLogo.svg" : "LightLogo.svg"}`}
						alt="Logo"
					/>
					<span
						className={`${
							isDarkMode ? "DarkSelectChat" : "LightSelectChat"
						} breathe`}
					>
						SELECT A CHAT TO START MESSAGING
					</span>
				</div>
			)}
		</div>
	);
};

export default ChatBox;
