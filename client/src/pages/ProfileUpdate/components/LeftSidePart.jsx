import React, { useState } from "react";
// import { FaCamera } from "react-icons/fa";
import BasicInfo from "./BasicInfo";
import EditInfoModal from "./EditInfoModal";
import PreventionPopup from "../../../components/Popup/PreventionPopup";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useProfileContext } from "../../../context/ProfileContext";

const LeftSidePart = () => {
	const navigate = useNavigate();
	const data = useProfileContext();
	const {
		userId,
		username,
		email,
		tel,
		address,
		gender,
		role,
		joinedDate,
		createdPost,
		createdThread,
		profileImage,
	} = data;
	const [basicInfo, setBasicInfo] = useState(data);

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
		<div className="my-5 col-12 col-lg-3">
			<div className="ms-4 me-4 me-lg-0 h-lg-50 h-100">
				{/* <p>Left side part</p> */}
				<div className="d-flex flex-column align-items-center justify-content-between h-100 left-part-container position-relative">
					<div className="d-flex flex-column align-items-center">
						<div className="d-flex flex-column align-items-center text-center rounded-circle profile-image-container position-relative">
							<img
								src={
									profileImage === "" ||
									profileImage === null ||
									profileImage === undefined
										? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
										: profileImage
								}
								alt={`${username} Avatar`}
								className="d-block w-100 p-0 rounded-circle avatar-image object-fit-cover border border-5 border-primary-yellow"
								style={{ aspectRatio: "1/1" }}
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
							/>
							<div className="position-absolute rounded-pill user-role bg-primary-yellow text-white fw-bolder">
								{role}
							</div>
						</div>
						<h1 className="mt-5 username-container">{username}</h1>
						<EditInfoModal />
					</div>
					<div className="w-100 d-flex flex-row align-items-center justify-content-between profile-figures">
						<div className="d-flex flex-column align-items-center">
							<strong>{createdThread?.length}</strong>
							<p>Communities</p>
						</div>
						<div className="d-flex flex-column align-items-center">
							<strong>{createdPost?.length}</strong>
							<p>Posts</p>
						</div>
						<div className="d-flex flex-column align-items-center">
							<strong>{joinedDate}</strong>
							<p>Joined Date</p>
						</div>
					</div>
					<div className="w-100">
						<BasicInfo id={0} displayInfo={email} />
						<BasicInfo id={1} displayInfo={tel} />
						<BasicInfo id={2} displayInfo={address} />
						<BasicInfo id={3} displayInfo={gender} />
					</div>
					<PreventionPopup
						modalTitle="Deactivate Account"
						buttonStyle="bg-danger text-white fw-semibold border-0 py-2 w-100 rounded-pill deactivate-btn"
						ariaLabel="Deactivate account"
						buttonValue="Deactivate account"
						action="deactivate your account"
						warningMessage="If you deactivate your account, you will be automatically logged
							out."
						actionFunction={deactivateAccount}
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftSidePart;
