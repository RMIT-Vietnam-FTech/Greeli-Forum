import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "./Conversation.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
axios.defaults.withCredentials = true;

const Conversation = ({ data, currentUserId, online, isActive, chatNoti}) => {
	const [userData, setUserData] = useState(null);
	const { isDarkMode } = useContext(ThemeContext);
	const [unseenMessages, setUnseenMessages] = useState([]);
	// const {user, chatNoti} = useUserContext();
	const { error, setError } = useUserContext();
	let userId = "";
	useEffect(() => {
		const getUserData = async () => {
			userId = data.members.find((id) => id !== currentUserId);
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/find/${userId}`,
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
			};
			axios(configuration)
				.then((result) => {
					setError(null);
					setUserData(result.data);
				})
				.catch((error) => {
					console.log(error);
					setError(error.response.data.error);
				});
		};
		getUserData();
	}, [data, currentUserId, error]);
	useEffect(() => {
		setUnseenMessages(chatNoti.filter((chat) => chat.isRead !== true))
		// setUnseenMessages((unseenMessages?.filter((message) => message.isRead !== false)))
		// console.log(unseenMessages)
	}, [chatNoti])


	return (
		<div
			className={`conversation ${
				isDarkMode ? "conversation-dark" : "conversation-light"
			} ${isActive ? "active" : ""}`}
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="conversation-content">
				{userData ? (
					<>
						<img
							src={
								userData.profileImage ||
								"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"
							}
							alt={userData.username}
							className={`conversation-image ${
								online ? "online" : "offline"
							}`}
						/>
						<div className="conversation-info">
							<div
								className={`${
									isDarkMode
										? "conversation-name-dark"
										: "conversation-name-light"
								} conversation-name ${
									isActive ? "active" : ""
								}`}
							>
								{userData.username || "Unknown"}
							</div>
							<div
								className={`${
									isDarkMode ? "status-dark" : "status-light"
								}`}
							>
								{online
									? "online"
									: `last seen ${moment(
											userData.lastActive,
										).fromNow()}`}
							</div>
						</div>
						{online && <div className="online-dot position-absolute top-0 end-0" />}
						{(unseenMessages.length > 0) && <p className="rounded-circle text-greeli-emphasis position-absolute bottom-0 end-0 unseen" style={{backgroundColor: "#B80000"}}>{unseenMessages?.length}</p>}
					</>
				) : (
					<div className="no-user-data">
						<span className="no-user-message">
							Go around and make some friends, lil bro
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Conversation;
