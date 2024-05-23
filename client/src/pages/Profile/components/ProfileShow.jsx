import React, { useState, useContext } from "react";
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../../../context/UserContext";
import { ThemeContext } from "../../../context/ThemeContext";
import Avatar from "react-avatar-edit";
const ProfileShow = (props) => {
	const [file, setFile] = useState();
	const { user, error, setError } = useUserContext();
	const [src, setSrc] = useState(null);
	const [preview, setPreview] = useState("");
	const { isDarkMode } = useContext(ThemeContext);

	const formData = new FormData();
	const userId = JSON.parse(user).id;
	const upload = () => {
		formData.append("image", preview);
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/upload/${userId}`,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		};
		axios(configuration)
			.then((result) => {
				toast.success("Successfully Uploaded!", {
					duration: 3000,
					position: "top-center",
				});
				console.log(result.data);
			})
			.catch((error) => {
				// toast.error(error.response.data.error, {
				// 	duration: 3000,
				// 	position: "top-center",
				// });
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		upload();
	};
	return (
		<div
			className="d-flex flex-row profile-show"
			role="region"
			aria-label="Profile Information"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="w-70 text-center profile-image-container position-relative">
				<img
					// src={props.imgURL}
					src={props.profileImage}
					alt={`${props.userName} Avatar`}
					className="rounded-circle avatar-image"
					style={{ width: "70%" }}
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				/>
				<div
					className=".overlay-profile position-absolute start-50 translate-middle-x d-flex justify-content-center .bg-transparente"
					style={{ bottom: "8px" }}
				>
					<div className="text-greeli-emphasis avatar-icon">
						<FaCamera
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							color={"white"}
						/>
					</div>
				</div>
			</div>

			<div className="d-flex flex-column gap-3">
				<h2 className="text-greeli-emphasis">{props.userName}</h2>
				<div className="d-flex flex-row align-items-center">
					<div
						className="py-1 bg-primary-yellow text-greeli-emphasis text-center rounded-pill role-container"
						role="status"
						aria-label={`Role: ${props.role}`}
					>
						{props.role}
					</div>
					<IoMdNotificationsOutline
						size={32}
						className="noti-icon text-greeli-emphasis"
						aria-label="Notifications"
						role="button"
						tabIndex={0}
					/>
				</div>
				<div className="d-flex flex-row text-greeli-emphasis  text-center justify-content-between w-80 profile-figures">
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`${props.threadsNum} Threads`}
					>
						<p className="fw-bold my-0">{props.threadsNum}</p>
						<p className="fw-light my-0">Threads</p>
					</div>
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`${props.postsNum} Posts`}
					>
						<p className="fw-bold my-0">{props.postsNum}</p>
						<p className="fw-light my-0">Posts</p>
					</div>
					<div
						className="d-flex flex-column w-auto"
						role="status"
						aria-label={`Joined on ${props.joinedDate}`}
					>
						<p className="fw-bold my-0">{props.joinedDate}</p>
						<p className="fw-light my-0">Joined Date</p>
					</div>
				</div>
			</div>

			<div
				className="modal fade position-absolute top-50 start-50 translate-middle"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<Toaster />
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5 text-greeli-emphasis"
								id="exampleModalLabel"
							>
								Change profile image
							</h1>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body text-center">
							{preview && (
								<img src={URL.createObjectURL(preview)} alt="avatar image" />
							)}
							<form>
								<input
									type="file"
									name="image"
									onChange={(e) => {
										setFile(e.target.files[0]);
										setPreview(e.target.files[0]);
									}}
								/>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileShow;
