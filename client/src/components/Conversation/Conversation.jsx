import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const Conversation = ({ data, currentUserId, online }) => {
	const [userData, setUserData] = useState(null);
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");

	useEffect(() => {
		console.log(data);
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
				});
		};
		getUserData();
	}, []);

	return (
		<>
			<div className="follower conversation">
				<div>
					{online && <div className="online-dot" />}
					<img
						src={userData?.profileImage}
						alt=""
						className="followerImage"
						style={{ width: "50px", height: "50px" }}
					/>
					<div className="name" style={{ fontSize: "0.8rem" }}>
						<span>{userData?.username}</span>
						<span>{online ? "Online" : "Offline"}</span>
					</div>
				</div>
			</div>
			<hr />
		</>
	);
};

export default Conversation;
