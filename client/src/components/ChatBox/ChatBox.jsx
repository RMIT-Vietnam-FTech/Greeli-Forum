import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import Cookies from "universal-cookie";
import "./ChatBox.css";
const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const scroll = useRef();
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");

	useEffect(() => {
		const getChatData = async () => {
			const receiverId = chat.members.find((id) => id !== currentUserId);
			const configuration = {
				method: "get",
				url: `/api/user/find/${receiverId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			axios(configuration)
				.then((result) => {
					setUserData(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		if (chat !== null) getChatData();
	}, [chat, currentUserId]);

	useEffect(() => {
		const fetchMessages = async () => {
			const chatId = chat._id;
			const configuration = {
				method: "get",
				url: `/api/message/find/${chatId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			axios(configuration)
				.then((result) => {
					// console.log(result.data);
					setMessages(result.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		if (chat !== null) fetchMessages();
	}, [chat]);

	const handleChange = (newMessage) => {
		setNewMessage(newMessage);
	};

	const handleSend = (e) => {
		e.preventDefault();
		const message = {
			chatId: chat._id,
			senderId: currentUserId,
			text: newMessage,
		};
		// send message to database
		const configuration = {
			method: "post",
			url: "/api/message/create",
			data: message,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		// send message to socket server
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

	// always scroll to the last message
	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<>
			<div className="ChatBox-container">
				{chat ? (
					<>
						<div className="chat-header">
							<div className="follower">
								<div>
									<div className="online-dot" />
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
										<span>{userData?.username}</span>
									</div>
								</div>
							</div>
							<hr />
						</div>
						{/* chatbox messages */}
						<div className="chat-body">
							{messages.map((message) => (
								<div key={message?._id}>
									<div
										ref={scroll}
										className={
											message.senderId === currentUserId
												? "message own"
												: "message"
										}
									>
										<span>{message.text}</span>{" "}
									</div>
								</div>
							))}
						</div>
						<div className="chat-sender">
							<div>+</div>
							<InputEmoji
								value={newMessage}
								onChange={handleChange}
							/>
							<button
								className="send-button button"
								onClick={handleSend}
								type="submit"
							>
								Send
							</button>
						</div>
					</>
				) : (
					<span className="chatbox-empty-message">
						Tap On chat to start a conversation
					</span>
				)}
			</div>
		</>
	);
};

export default ChatBox;
