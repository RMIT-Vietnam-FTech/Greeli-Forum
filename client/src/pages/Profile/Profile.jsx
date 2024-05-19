import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "../../scss/custom.scss";
import BasicInfo from "./components/BasicInfo";
import PostsGallery from "./components/PostsGallery";
import ProfileShow from "./components/ProfileShow";
import ChangePassword from "./components/ChangePassword";
import demoUserInfo from "./data";
import "./styles.css";

const Profile = () => {
	const user = demoUserInfo[0];

	const [basicInfo, setBasicInfo] = useState({});
	const [profileIsEditing, setProfileIsEditing] = useState(false);

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

					const { username, email, role, password } = user;
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

	return (
		<div className="container-fluid profile-container bg-primary-green-900">
			<div>
				<Toaster />
			</div>
			<div className="row overflow-auto">
				<div className="d-flex flex-column justify-content-between p-sm-5 pb-sm-0 p-4 pb-0 col-12 col-lg-7 full-height overflow-hidden">
					<ProfileShow
						userName={basicInfo.username}
						role={basicInfo.role}
						threadsNum={user.threadsNum}
						postsNum={user.postsNum}
						joinedDate={user.joinedDate}
					/>
					<div className="btn-chat-container d-flex justify-content-center mt-3">
						<button
							className={`d-lg-none py-1 px-3 ${
								isMe ? "bg-danger text-white" : "bg-primary-yellow text-black"
							} text-white text-center rounded-pill`}
							aria-label={
								isMe ? "Deactivate my account" : "Chat with this user"
							}
						>
							{isMe ? "Deactivate my account" : "Chat with this user"}
						</button>
					</div>
					<div className="d-flex d-lg-none flex-column justify-content-between pt-5 px-2 col-12 right-part">
						{/* Basic Setting Section For Mobile Show */}
						<div>
							<h2 className="fs-4 text-white border-bottom border-white fw-light">
								{isMe ? "Basic Setting" : "Basic Info"}
							</h2>
							<BasicInfo
								id={0}
								type="description"
								basicInfo={basicInfo}
								// updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfo
								id={1}
								type="email"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfo
								id={2}
								type="tel"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfo
								id={3}
								type="address"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
							<BasicInfo
								id={4}
								type="gender"
								basicInfo={basicInfo}
								updateBasicInfo={handleUpdateBasicInfo}
								toaster={Toaster}
								isMe={isMe}
							/>
						</div>

						{/* Account Setting Section */}
						{isMe && (
							<div>
								<h2 className="fs-4 text-white border-bottom border-white fw-light">
									Account Setting
								</h2>
								<ChangePassword userId={userId} />
							</div>
						)}
					</div>
					<PostsGallery profilePosts={user.profilePosts} />
				</div>
				<div className="d-lg-flex d-none flex-column justify-content-between py-5 px-5 col-5 right-part">
					{/* Basic Setting Section For Laptop Show */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">
							{isMe ? "Basic Setting" : "Basic Info"}
						</h2>
						<BasicInfo
							id={0}
							type="description"
							basicInfo={basicInfo}
							// updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfo
							id={1}
							type="email"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfo
							id={2}
							type="tel"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfo
							id={3}
							type="address"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
						<BasicInfo
							id={4}
							type="gender"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
							isMe={isMe}
						/>
					</div>

					{/* Account Setting Section */}
					{isMe && (
						<div>
							<h2 className="fs-4 text-white border-bottom border-white fw-light">
								Account Setting
							</h2>
							<ChangePassword userId={userId} />
						</div>
					)}

					{/* Deactivate button */}
					<button
						className={`${
							isMe ? "bg-danger text-white" : "bg-primary-yellow text-black"
						} rounded-pill mt-5 py-2`}
						aria-label={isMe ? "Deactivate account" : "Chat with this user"}
					>
						{isMe ? "Deactivate account" : "Chat with this user"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
