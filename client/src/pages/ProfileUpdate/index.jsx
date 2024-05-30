import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { Toaster } from "react-hot-toast";
import "../../scss/custom.scss";
import { FaCamera } from "react-icons/fa";
import LeftSidePart from "./components/LeftSidePart";
import RightSidePart from "./components/RightSidePart";
import "./styles.css";
// import demoUserInfo from "./data";
import { ProfileContext } from "../../context/ProfileContext";

const ProfileUpdate = (props) => {
	const { user, setUser, toggleUserInfo, success, setSuccess } =
		useUserContext();
	const { isDarkMode } = useContext(ThemeContext);
	// const userData = demoUserInfo[0];
	const navigate = useNavigate();
	const [basicInfo, setBasicInfo] = useState({});
	const [comments, setComments] = useState([]);

	// GET ID FROM LOCAL STORAGE
	const currentUserId = JSON.parse(localStorage.getItem("user")).id;

	// GET ID FROM URL PARAMS AND CHECK WHETHER IT'S THE CURRENT USER'S PROFILE
	const requiredId = useParams().userId || currentUserId;
	// console.log(currentUserId, requiredId);
	const isMe = currentUserId === requiredId;
	const userId = isMe ? currentUserId : requiredId;

	// ----------------------------

	// FETCH USER INFO FROM DB THROUGH ID: username, email, role, profileImage
	// EXCEPT tel, address, gender
	useEffect(() => {
		var fetchedBasicInfo = {};
		async function fetchUser() {
			const configuration = {
				method: "get",
				url: `http://localhost:3001/api/user/${userId}`,
			};
			await axios(configuration)
				.then((result) => {
					// console.log(result);
					const { user } = result.data;
					// console.log(user);

					const prefixForNoInfo = isMe ? "Please update your " : "No";

					const {
						username,
						email,
						role,
						password,
						isLocked,
						createdPost,
						createdThread,
						createdAt,
						archivedPost,
					} = user;
					const tel = user.tel;
					const address = user.address;
					// ? user.address
					// : `${prefixForNoInfo} address`;
					const gender = user.gender;
					// ? user.gender
					// : `${prefixForNoInfo} gender`;
					const profileImage = user.profileImage ? user.profileImage : "";
					const description = user.description
						? user.description
						: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...";

					fetchedBasicInfo = {
						userId: userId,
						username: username,
						email: email,
						role: role,
						profileImage: profileImage,
						tel: tel,
						address: address,
						gender: gender,
						password: password,
						description: description,
						isLocked: isLocked,
						createdPost: createdPost,
						createdThread: createdThread,
						archivedPost: archivedPost,
						joinedDate: createdAt.substring(0, 10),
					};
				})
				.catch((error) => {
					console.log("Error", error);
				});
			// console.log("Fetched Basic Info", fetchedBasicInfo);
			setBasicInfo(fetchedBasicInfo);
		}

		fetchUser();
	}, [userId, isMe, success]);
	// ----------------------------

	//FETCH USER COMMENTS
	useEffect(() => {
		const configuration = {
			method: "get",
			url: `http://localhost:3001/api/v1/comments?userId=${userId}`,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				setComments(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userId]);

	// ----------------------------

	return (
		<ProfileContext.Provider value={basicInfo}>
			<div
				className="container-fluid profile-page-container bg-greeli-subtle"
				data-bs-theme={isDarkMode ? "dark" : "light"}
			>
				<Toaster />
				<div className="row row-cols-12 h-100">
					<LeftSidePart isMe={isMe} />
					<RightSidePart isMe={isMe} comments={comments} />
				</div>
			</div>
		</ProfileContext.Provider>
	);
};

export default ProfileUpdate;
