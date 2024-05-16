import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "../../scss/custom.scss";
import BasicInfo from "./components/BasicInfo";
import PostsGallery from "./components/PostsGallery";
import ProfileShow from "./components/ProfileShow";
import demoUserInfo from "./data";
import "./styles.css";

const Profile = () => {
	const user = demoUserInfo[0];
	// const initialBasicInfo = {
	// 	email: user.email,
	// 	tel: user.tel,
	// 	address: user.address,
	// 	gender: user.gender,
	// };

	const [basicInfo, setBasicInfo] = useState({});

	// GET ID FROM LOCAL STORAGE
	const userId = JSON.parse(localStorage.getItem("user")).id;
	// console.log(userId);

	// FETCH USER INFO FROM DB THROUGH ID: username, email, role, profileImage
	// EXCEPT tel, address, gender
	useEffect(() => {
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

					const { username, email, role } = user;
					const tel = user.tel ? user.tel : "Please update your phone number";
					const address = user.address
						? user.address
						: "Please update your address";
					const gender = user.gender
						? user.gender
						: "Please update your gender";
					const profileImage = user.profileImage ? user.profileImage : "";

					const fetchedBasicInfo = {
						userId: userId,
						username: username,
						email: email,
						role: role,
						profileImage: profileImage,
						tel: tel,
						address: address,
						gender: gender,
					};
					// console.log(fetchedBasicInfo);

					setBasicInfo(fetchedBasicInfo);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}

		fetchUser();
	}, [userId]);

	// Let user input and update these info
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

	return (
		<div className="container-fluid profile-container bg-primary-green-900">
			<div>
				<Toaster />
			</div>
			<div className="row full-height">
				<div className="d-flex flex-column justify-content-between p-5 pb-0 col-12 col-lg-7 full-height overflow-hidden">
					<ProfileShow
						userName={basicInfo.username}
						role={basicInfo.role}
						threadsNum={user.threadsNum}
						postsNum={user.postsNum}
						joinedDate={user.joinedDate}
					/>
					<div className="mt-3">
						<div className="btn-edit-container d-flex justify-content-center">
							<button className="d-lg-none py-1 px-3 bg-primary-yellow text-white text-center rounded-pill">
								Edit Profile
							</button>
						</div>
					</div>
					<PostsGallery profilePosts={user.profilePosts} />
				</div>
				<div className="d-lg-flex d-none flex-column justify-content-between py-5 px-5 col-5 full-height right-part">
					{/* Basic Setting Section */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">
							Basic Setting
						</h2>
						<BasicInfo
							id={0}
							type="email"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
						/>
						<BasicInfo
							id={1}
							type="tel"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
						/>
						<BasicInfo
							id={2}
							type="address"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
						/>
						<BasicInfo
							id={3}
							type="gender"
							basicInfo={basicInfo}
							updateBasicInfo={handleUpdateBasicInfo}
							toaster={Toaster}
						/>
					</div>

					{/* Account Setting Section */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">
							Account Setting
						</h2>
						<div className="d-flex justify-content-between">
							<p className="text-white">Password</p>
							<button className="bg-primary-green-400 text-white rounded-pill border-none">
								Reset Password
							</button>
						</div>
					</div>

					{/* Deactivate button */}
					<button className="bg-danger text-white rounded-pill mt-5 py-2">
						Deactivate account
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
