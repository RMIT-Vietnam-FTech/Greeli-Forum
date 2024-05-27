import React, { useState, useEffect, useContext } from "react";
import { useUserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "../../scss/custom.scss";
import { FaCamera } from "react-icons/fa";
import LeftSidePart from "./components/LeftSidePart";
import RightSidePart from "./components/RightSidePart";
import "./styles.css";
import PreventionPopup from "../../components/Popup/PreventionPopup";
// import demoUserInfo from "./data";
import { UserContext } from "../../context/UserContext";
import Cookies from "universal-cookie";

const ProfileUpdate = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	// const userData = demoUserInfo[0];
	const navigate = useNavigate();
	const [basicInfo, setBasicInfo] = useState({});

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
					const tel = user.tel ? user.tel : `${prefixForNoInfo} phone number`;
					const address = user.address
						? user.address
						: `${prefixForNoInfo} address`;
					const gender = user.gender
						? user.gender
						: `${prefixForNoInfo} gender`;
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
	}, [userId, isMe]);
	// ----------------------------

	// LET USER EDIT THEIR INFO
	const handleUpdateBasicInfo = (newBasicInfo) => {
		// console.log(newBasicInfo);
		setBasicInfo(newBasicInfo);
		updateUserData(newBasicInfo);
	};

	const updateUserData = (basicInfo) => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/${basicInfo.userId}/update`,
			data: basicInfo,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// ----------------------------

	// DEACTIVATE ACCOUNT FUNCTION
	const { user, setUser, toggleUserInfo } = useUserContext();
	const cookies = new Cookies();

	const deactivateAccount = () => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/${userId}/deactivate`,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				localStorage.removeItem("user");
				cookies.remove("TOKEN", { path: "/" });
				setUser(null);
				navigate("/", { replace: true });
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("Account deactivated");
	};
	// ----------------------------

	// BLOCK/UNBLOCK USER FUNCTION
	const isAdmin = JSON.parse(localStorage.getItem("user")).role === "admin";
	const token = cookies.get("TOKEN");
	const handleLockAccount = () => {
		const userId = basicInfo.userId;
		const adminId = JSON.parse(localStorage.getItem("user")).id;
		const action = basicInfo.isLocked ? "unlock" : "lock";
		// console.log("Lock/Unlock user");
		const configuration = {
			method: "put",
			url: `http://localhost:3001/api/user/${adminId}/${userId}/${action}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				const newBasicInfo = {
					...basicInfo,
					isLocked: !basicInfo.isLocked,
				};
				setBasicInfo(newBasicInfo);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="container-fluid profile-page-container">
			<Toaster />
			{/* <h1>Profile Update</h1> */}
			<div className="row row-cols-12 h-100">
				<LeftSidePart userInfo={basicInfo} />
				<RightSidePart userInfo={basicInfo} />
			</div>
		</div>
	);
};

export default ProfileUpdate;
