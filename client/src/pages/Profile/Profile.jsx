import "../../scss/custom.scss";
import "./styles.css";
import React, { useState } from "react";
import BasicInfo from "./components/BasicInfo";
import PostsGallery from "./components/PostsGallery";
import ProfileShow from "./components/ProfileShow";
import demoUserInfo from "./data";
import { Toaster } from 'react-hot-toast';


const Profile = () => {
	const user = demoUserInfo[0];
	const initialBasicInfo = {
		email: user.email,
		tel: user.tel,
		address: user.address,
		gender: user.gender
	}
	const [basicInfo, setBasicInfo] = useState(initialBasicInfo);

	return (
		<div className="container-fluid profile-container bg-primary-green-900">
			<div><Toaster/></div>
			<div className="row full-height">
				<div className="d-flex flex-column justify-content-between p-5 pb-0 col-7 full-height overflow-hidden">
					<ProfileShow
						userName={user.userName}
						role={user.role}
						threadsNum={user.threadsNum}
						postsNum={user.postsNum}
						joinedDate={user.joinedDate}
					/>
					<PostsGallery profilePosts={user.profilePosts} />
				</div>
				<div className="d-flex flex-column justify-content-between py-5 px-5 col-5 full-height">
					{/* Basic Setting Section */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">
							Basic Setting
						</h2>
						<BasicInfo id={0} type="email" basicInfo={basicInfo} setBasicInfo={setBasicInfo} toaster={Toaster} />
						<BasicInfo id={1} type="tel" basicInfo={basicInfo} setBasicInfo={setBasicInfo} toaster={Toaster}/>
						<BasicInfo id={2} type="address" basicInfo={basicInfo} setBasicInfo={setBasicInfo} toaster={Toaster}/>
						<BasicInfo id={3} type="gender" basicInfo={basicInfo} setBasicInfo={setBasicInfo} toaster={Toaster}/>
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
