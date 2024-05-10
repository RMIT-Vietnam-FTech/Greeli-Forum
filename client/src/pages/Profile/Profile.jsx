import "../../scss/custom.scss";
import "./styles.css";
import BasicInfo from "./components/BasicInfo";
import ProfileShow from './components/ProfileShow';
import PostsGallery from "./components/PostsGallery";
import demoUserInfo from "./data";

const Profile = () => {
	const user = demoUserInfo[0];

	return (
		<div className="container-fluid profile-container bg-primary-green-900">
			<div className="row full-height">
				<div className="py-5 px-5 col-7 full-height">
					<ProfileShow userName={user.userName} role={user.role} threadsNum={user.threadsNum} postsNum={user.postsNum} joinedDate={user.joinedDate} />
					<PostsGallery profilePosts={user.profilePosts}/>
				</div>
				<div className="d-flex flex-column justify-content-between py-5 px-5 col-5 full-height">
					{/* Basic Setting Section */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">Basic Setting</h2>
						<BasicInfo id={0} type="email" info={user.email} />
						<BasicInfo id={1} type="tel" info={user.tel} />
						<BasicInfo id={2} type="address" info={user.address} />
						<BasicInfo id={3} type="gender" info={user.gender} />
					</div>

					{/* Account Setting Section */}
					<div>
						<h2 className="fs-4 text-white border-bottom border-white fw-light">Account Setting</h2>
						<div className="d-flex justify-content-between">
							<p className="text-white">Password</p>
							<button className="bg-primary-green-400 text-white rounded-pill border-none">Reset Password</button>
						</div>
					</div>

					{/* Deactivate button */}
					<button className="bg-danger text-white rounded-pill mt-5 py-2">Deactivate account</button>
				</div>
			</div>

		</div>
	);
}

export default Profile;
