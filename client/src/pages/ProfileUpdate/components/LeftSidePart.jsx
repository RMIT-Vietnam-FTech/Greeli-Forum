import React, { useState } from "react";
// import { FaCamera } from "react-icons/fa";
import BasicInfo from "./BasicInfo";
import EditInfoModal from "./EditInfoModal";
import PreventionPopup from "../../../components/Popup/PreventionPopup";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useProfileContext } from "../../../context/ProfileContext";
axios.defaults.withCredentials = true;

const LeftSidePart = (props) => {
	//GET ID FROM LOCAL STORAGE AND PARAM
	const currentUserId = JSON.parse(localStorage.getItem("user")).id;
	const requiredId = useParams().userId || currentUserId;
	// console.log(requiredId);

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
		archivedPost,
		profileImage,
	} = data;
	const [basicInfo, setBasicInfo] = useState(data);
	const { isMe, comments } = props;
	console.log(comments);

	//ARCHIVE POSTS + THREADS
	const archiveCreatedPost = (postId) => {
		const configuration = {
			method: "put",
			url: `http://localhost:3001/api/v1/posts/${postId}/archive-by-deactivating`,
			data: {
				userId: userId,
				username: username,
				profileImage: profileImage,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const archiveCreatedComment = (commentId) => {
		const configuration = {
			method: "put",
			url: `http://localhost:3001/api/v1/comments/${commentId}/archive-by-deactivating`,
			data: {
				userId: userId,
				username: username,
				profileImage: profileImage,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// DEACTIVATE ACCOUNT FUNCTION
	const { user, setUser, toggleUserInfo } = useUserContext();
	const cookies = new Cookies();

	const deactivateAccount = () => {
		// console.log(createdThread, createdPost);

		createdPost.forEach((postId) => {
			archiveCreatedPost(postId);
		});

		console.log(createdPost, comments.data);

		comments.data.forEach((comment) => {
			archiveCreatedComment(comment._id);
		});

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
		const adminId = JSON.parse(localStorage.getItem("user")).id;
		const action = basicInfo.isLocked ? "unlock" : "lock";
		// console.log("Lock/Unlock user");
		const configuration = {
			method: "put",
			url: `http://localhost:3001/api/user/${adminId}/${requiredId}/${action}`,
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

	// CREATE CHAT
	const createChat = () => {
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

	// console.log(isMe, isAdmin);

	return (
		<div className="my-5 col-12 col-lg-3 text-greeli-emphasis">
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
						<h1 className="px-3 mt-5 username-container">{username}</h1>
						{isMe && <EditInfoModal />}
					</div>
					<div className="w-100 d-flex flex-row align-items-center justify-content-between profile-figures">
						<div className="d-flex flex-column align-items-center">
							<strong>{createdPost?.length}</strong>
							<p>Threads</p>
						</div>
						<div className="d-flex flex-column align-items-center">
							<strong>{comments?.data?.length}</strong>
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
					<div className="d-flex flex-column gap-1">
						{/* DEACTIVATE BUTTON */}
						{isMe && (
							<PreventionPopup
								modalTitle="Deactivate Account"
								buttonStyle="bg-danger text-white fw-semibold border-0 py-2 px-4 w-100 rounded-pill deactivate-btn "
								ariaLabel="Deactivate account"
								buttonValue="Deactivate account"
								action="deactivate your account"
								warningMessage="If you deactivate your account, you will be automatically logged
							out."
								actionFunction={deactivateAccount}
							/>
						)}

						{/* CHAT BUTTON */}
						{!isMe && (
							<button
								className="bg-primary-yellow text-black rounded-pill mt-5 py-2 px-4 border-0"
								aria-label="Chat with this user"
								onClick={() => {
									// navigate(`/chat`, { root: true });
									createChat();
								}}
							>
								Chat with this user
							</button>
						)}

						{/* LOCK/UNLOCK BUTTON */}
						{!isMe && isAdmin && (
							<PreventionPopup
								modalTitle={`${basicInfo.isLocked ? "Unlock" : "Lock"} Account`}
								buttonStyle="bg-danger text-white rounded-pill mt-2 py-2 border-0"
								ariaLabel={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								buttonValue={`${
									basicInfo.isLocked ? "Unlock" : "Lock"
								} this user`}
								action={`${basicInfo.isLocked ? "unlock" : "lock"} this user`}
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

export default LeftSidePart;
