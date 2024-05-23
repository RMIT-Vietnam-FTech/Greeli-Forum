import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../scss/custom.scss";
import BasicInfo from "./components/BasicInfo";
import PostsGallery from "./components/PostsGallery";
import ProfileShow from "./components/ProfileShow";
import ChangePassword from "./components/ChangePassword";
import PreventionPopup from "../../components/Popup/PreventionPopup";
import demoUserInfo from "./data";
import "./styles.css";
import { UserContext, useUserContext } from "../../context/UserContext";
import Cookies from "universal-cookie";
import BasicInfoEmail from "./components/BasicInfoEmail";
import BasicInfoTel from "./components/BasicInfoTel";
import BasicInfoAddress from "./components/BasicInfoAddress";
import BasicInfoGender from "./components/BasicInfoGender";
axios.defaults.withCredentials = true;

const Profile = () => {
	const { isDarkMode } = useContext(ThemeContext);
	const userData = demoUserInfo[0];
	const navigate = useNavigate();
	const [basicInfo, setBasicInfo] = useState({});

	const { user, setUser, toggleUserInfo, success, setSuccess } =
		useUserContext();

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
						archievedPost,
						followThread,
					} = user;
					const tel = user.tel
						? user.tel
						: `${prefixForNoInfo} phone number`;
					const address = user.address
						? user.address
						: `${prefixForNoInfo} address`;
					const gender = user.gender
						? user.gender
						: `${prefixForNoInfo} gender`;
					const profileImage = user.profileImage
						? user.profileImage
						: "";
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
						archievedPost: archievedPost,
						followThread: followThread,
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
				toast.success("Info Updated", {
					duration: 3000,
				});
			})
			.catch((error) => {
				toast.failed(error.data.response.error, {
					duration: 3000,
				});
				console.log(error);
			});
	};
	// ----------------------------

	// DEACTIVATE ACCOUNT FUNCTION
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
				// Authorization: `Bearer ${token}`,
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
	//---------------------------

	// CREATE CHAT
	const createChat = (user) => {
		const configuration = {
			method: "post",
			url: "/api/chat/create",
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				senderId: currentUserId,
				receiverId: requiredId,
			},
		};
		axios(configuration)
			.then((result) => {
				// console.log(result.data);
				navigate("/chat");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div
			className="container-fluid profile-container bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			{/* <Toaster /> */}
			<div className="row overflow-auto">
				<div className="d-flex flex-column justify-content-between p-sm-5 pb-sm-0 p-4 pb-0 col-12 col-lg-7 full-height overflow-hidden place">
					<ProfileShow
						userName={basicInfo.username}
						profileImage={basicInfo.profileImage}
						role={basicInfo.role}
						threadsNum={
							basicInfo.createdThread
								? basicInfo.createdThread.length
								: 0
						}
						postsNum={
							basicInfo.createdPost
								? basicInfo.createdPost.length
								: 0
						}
						joinedDate={basicInfo.joinedDate}
						isMe={isMe}
					/>
					<div className="btn-chat-container d-flex justify-content-center mt-3">
						{/* Deactivate/ Chat with user button */}
						{isMe ? (
							<PreventionPopup
								modalTitle="Deactivate Account"
								buttonStyle="bg-danger text-white rounded-pill mt-5 py-2 px-4 d-lg-none d-block"
								ariaLabel="Deactivate account"
								buttonValue="Deactivate account"
								action="deactivate your account"
								warningMessage="If you deactivate your account, you will be automatically logged
							out."
								actionFunction={deactivateAccount}
							/>
						) : (
							<button
								className="bg-primary-yellow text-black rounded-pill mt-5 py-2 px-4 d-lg-none d-block"
								aria-label="Chat with this user"
								onClick={() => {
									navigate(`/chat`, { root: true });
								}}
							>
								Chat with this user
							</button>
						)}
						{/* Lock/Unlock user button */}
						{!isMe && isAdmin && (
							// <button
							// 	className="bg-danger text-white rounded-pill mt-5 py-2 d-lg-none d-block"
							// 	aria-label={`${
							// 		basicInfo.isLocked ? "Unlock" : "Lock"
							// 	} with this user`}
							// >
							// 	{`${basicInfo.isLocked ? "Unlock" : "Lock"} this user`}
							// </button>
							<PreventionPopup
								modalTitle={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} Account`}
								buttonStyle="bg-danger text-white rounded-pill mt-5 py-2 d-lg-none d-block"
								ariaLabel={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								buttonValue={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								action={`${
									basicInfo.isLocked ? "unlock" : "lock"
								} this user`}
								warningMessage={`If you ${
									basicInfo.isLocked ? "unlock" : "lock"
								} this account, the user will be ${
									basicInfo.isLocked ? "unlocked" : "locked"
								} from all of their activities.`}
								actionFunction={handleLockAccount}
							/>
						)}
					</div>
					<div className="d-flex d-lg-none flex-column justify-content-between pt-5 px-2 col-12 right-part">
						{/* Basic Setting Section For Mobile Show */}
						<div>
							<h2 className="fs-4 text-greeli-emphasis border-profile fw-bold">
								{isMe ? "Basic Setting" : "Basic Info"}
							</h2>
							<BasicInfo
								id={0}
								type="description"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfoEmail
								id={1}
								type="email"
								name="email"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfoTel
								id={2}
								type="tel"
								name="tel"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfoAddress
								id={3}
								type="address"
								name="address"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfoGender
								id={4}
								type="gender"
								name="gender"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
						</div>

						{/* Account Setting Section */}
						{isMe && (
							<div>
								<h2 className="fs-4 text-greeli-emphasis border-profile fw-bold">
									Account Setting
								</h2>
								<ChangePassword userId={userId} />
							</div>
						)}
					</div>
					<PostsGallery
						profilePosts={[
							basicInfo.createdPost || [],
							basicInfo.archievedPost || [],
						]}
						// profilePosts={userData.profilePosts}
						isMe={isMe}
						userId={userId}
					/>
				</div>
				<div className="d-lg-flex d-none flex-column justify-content-between py-5 px-5 col-5 right-part">
					{/* Basic Setting Section For Laptop Show */}
					<div>
						<h2 className="fs-4 text-greeli-emphasis border-profile fw-bold">
							{isMe ? "Basic Setting" : "Basic Info"}
						</h2>
						<BasicInfo
							id={0}
							type="description"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfoEmail
							id={1}
							type="email"
							name="email"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfoTel
							id={2}
							type="tel"
							name="tel"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfoAddress
							id={3}
							type="address"
							name="address"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfoGender
							id={4}
							type="gender"
							name="gender"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
					</div>

					{/* Account Setting Section */}
					{isMe && (
						<div>
							<h2 className="fs-4 text-greeli-emphasis border-profile fw-bold">
								Account Setting
							</h2>
							<ChangePassword userId={userId} />
						</div>
					)}
					<div className="d-flex flex-column">
						{/* Deactivate/Chat with user button */}
						{isMe ? (
							<PreventionPopup
								modalTitle="Deactivate Account"
								buttonStyle="bg-danger text-white rounded-pill mt-5 py-2"
								ariaLabel="Deactivate account"
								buttonValue="Deactivate account"
								action="deactivate your account"
								warningMessage="If you deactivate your account, you will be automatically logged
							out."
								actionFunction={deactivateAccount}
							/>
						) : (
							<button
								className="bg-primary-yellow text-black rounded-pill mt-5 py-2 w-100"
								aria-label="Chat with this user"
								onClick={createChat}
							>
								Chat with this user
							</button>
						)}
						{/* Lock/Unlock user button */}
						{!isMe && isAdmin && (
							// <button
							// 	className="bg-danger text-white rounded-pill mt-2 py-2 d-block w-100"
							// 	aria-label={`${
							// 		basicInfo.isLocked ? "Unlock" : "Lock"
							// 	} this user`}
							// >
							// 	{`${basicInfo.isLocked ? "Unlock" : "Lock"} this user`}
							// </button>
							<PreventionPopup
								modalTitle={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} Account`}
								buttonStyle="bg-danger text-white rounded-pill mt-2 py-2 d-block w-100"
								ariaLabel={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								buttonValue={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								action={`${
									basicInfo.isLocked ? "unlock" : "lock"
								} this user`}
								warningMessage={`If you ${
									basicInfo.isLocked ? "unlock" : "lock"
								} this account, the user will be ${
									basicInfo.isLocked ? "unlocked" : "locked"
								} from all of their activities.`}
								actionFunction={handleLockAccount}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
