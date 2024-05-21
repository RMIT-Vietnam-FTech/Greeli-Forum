import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import moment from "moment";
import "./Conversation.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";

const Conversation = ({ data, currentUserId, online, isActive }) => {
	const [userData, setUserData] = useState(null);
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const { isDarkMode } = useContext(ThemeContext);
	const { error, setError } = useUserContext();

	useEffect(() => {
		const getUserData = async () => {
			const userId = data.members.find((id) => id !== currentUserId);
			const configuration = {
				method: "get",
				url: `/api/user/find/${userId}`,
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
					setError(error.response.data.error);
				});
		};
		getUserData();
	}, [data, currentUserId, token]);

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
							src={userData?.profileImage || 'https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg'}
							alt={userData.username}
							className={`conversation-image ${
								online ? "online" : "offline"
							}`}
						/>
						<div className="conversation-info">
							<div className={`${
									isDarkMode ? "conversation-name-dark" : "conversation-name-light"
								} conversation-name ${isActive ? "active" : ""}`}>
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
						{online && <div className="online-dot" />}
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
