import React from "react";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import Image from "react-bootstrap/Image";
import { IoIosSettings } from "react-icons/io";
import "reactjs-popup/dist/index.css";
import { MdSettingsInputSvideo } from "react-icons/md";
// import "./PreventionPopup.css";

const EditInfoModal = (props) => {
	const { userId, username, tel, address, gender } = props.userInfo;
	const basicInfo = props.basicInfo;
	var currentGender = "";
	if (gender !== "Please update your  gender") {
		currentGender = gender;
	}
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newAddress, setnewAddress] = useState(address);
	const [newPhoneNumber, setnewPhoneNumber] = useState(tel);
	const [newGender, setNewGender] = useState(currentGender);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (event) => {
		updateUserInfo(newPhoneNumber, newAddress, newGender, userId);
		isChangingPassword && sendOldPassword(oldPassword, newPassword, userId);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({ oldPassword: "", newPassword: "" });
		}
	}, [isSubmitSuccessful, reset]);

	// SEND OLD PASS INPUT TO SERVER TO COMPARE
	const sendOldPassword = async (oldPassword, newPassword, userId) => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/change-password`,
			data: {
				userId: userId,
				oldPassword: oldPassword,
				newPassword: newPassword,
			},
		};
		await axios(configuration)
			.then((result) => {
				toast.success(result.data.message);
				setNewPassword("");
				setOldPassword("");
			})
			.catch((error) => {
				console.log("Error", error);
				toast.error(error.response.data.message);
			});
	};

	//UPDATE USER INFO
	const updateUserInfo = async (
		newPhoneNumber,
		newAddress,
		newGender,
		userId
	) => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/${userId}/update`,
			data: {
				...basicInfo,
				tel: newPhoneNumber,
				address: newAddress,
				gender: newGender,
			},
		};
		await axios(configuration)
			.then((result) => {
				toast.success(result.data.message);
			})
			.catch((error) => {
				console.log("Error", error);
				toast.error(error.response.data.message);
			});
	};
	// ----------------------------

	//UPLOAD PROFILE IMAGE
	const [file, setFile] = useState();
	const { user, error, setError } = useUserContext();
	const [src, setSrc] = useState(null);
	const [preview, setPreview] = useState("");
	const formData = new FormData();
	const upload = () => {
		formData.append("image", preview);
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/${userId}/uploadImage`,
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

	const handleAvatarSubmit = (e) => {
		// e.preventDefault();
		upload();
	};

	return (
		<Popup
			trigger={
				<button
					aria-label="Edit Info Button"
					className="position-absolute end-0 border-0 bg-transparent"
				>
					<IoIosSettings className="info-icon rounded-circle bg-primary-green-100 text-primary-green-900" />
				</button>
			}
			modal
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			{(close) => (
				<form
					className="bg-primary-green-100 p-4 rounded-3"
					onSubmit={handleAvatarSubmit(onSubmit)}
					aria-label="Change Profile Form"
				>
					<div className="mb-3">
						<h2>Change Basic Info</h2>
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
						<div className="row d-flex flex-row align-items-center g-1">
							<label htmlFor="newPhoneNumber" className="col-5 px-2">
								Phone Number
							</label>
							<input
								type="text"
								{...register("newPhoneNumber", {
									maxLength: {
										value: 10,
										message: "This input must not exceed 50 characters",
									},
								})}
								className="col-7 px-2 text-greeli-emphasis border-input-change-pass"
								id="newPhoneNumber"
								value={newPhoneNumber ? newPhoneNumber : tel}
								onChange={(e) => {
									setnewPhoneNumber(e.target.value);
									console.log(newPhoneNumber);
								}}
								style={{
									border: "solid white 1px",
									borderRadius: "4px",
									backgroundColor: "transparent",
									color: "white",
								}}
								aria-invalid={errors.newPhoneNumber ? "true" : "false"}
							/>
							{errors.newPhoneNumber && (
								<p className="error" role="alert">
									{errors.newPhoneNumber.message}
								</p>
							)}
						</div>
						<div className="row d-flex flex-row align-items-center g-1 mt-3">
							<label htmlFor="newAddress" className="col-5 px-2">
								Address
							</label>
							<input
								type="text"
								{...register("newAddress", {
									maxLength: {
										value: 50,
										message: "This input must not exceed 50 characters",
									},
								})}
								className="col-7 px-2 text-greeli-emphasis border-input-change-pass"
								id="newAddress"
								value={newAddress ? newAddress : address}
								onChange={(e) => {
									setnewAddress(e.target.value);
								}}
								style={{
									border: "solid white 1px",
									borderRadius: "4px",
									backgroundColor: "transparent",
									color: "white",
								}}
								aria-invalid={errors.newAddress ? "true" : "false"}
							/>
							{errors.newAddress && (
								<p className="error" role="alert">
									{errors.newAddress.message}
								</p>
							)}
						</div>
						<div className="row d-flex flex-row align-items-center g-1 mt-3">
							<label htmlFor="newGender" className="col-5 px-2">
								Gender
							</label>
							<select
								name="cars"
								id="cars"
								className="col-7 px-2 text-greeli-emphasis border-input-change-pass"
								onChange={(e) => {
									setNewGender(e.target.value);
								}}
								defaultValue={newGender ? newGender : "none"}
							>
								<option value="none" selected disabled hidden>
									Update your gender
								</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
							{errors.newAddress && (
								<p className="error" role="alert">
									{errors.newAddress.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<h2>Change Password</h2>
						{isChangingPassword && (
							<div>
								<div className="row d-flex flex-row align-items-center g-1">
									<label htmlFor="oldPassword" className="col-4 px-2">
										Enter your old password
									</label>
									<input
										type="password"
										{...register("oldPassword", {
											required: "This input is required.",
										})}
										className="col-8 px-2 text-greeli-emphasis border-input-change-pass"
										id="oldPassword"
										value={oldPassword}
										onChange={(e) => {
											setOldPassword(e.target.value);
										}}
										style={{
											border: "solid white 1px",
											borderRadius: "4px",
											backgroundColor: "transparent",
											color: "white",
										}}
										aria-invalid={errors.oldPassword ? "true" : "false"}
									/>
									{errors.oldPassword && (
										<p className="error" role="alert">
											{errors.oldPassword.message}
										</p>
									)}
								</div>
								<div className="row d-flex flex-row align-items-center g-1 mt-3">
									<label htmlFor="newPassword" className="col-4 px-2">
										Enter your new password
									</label>
									<input
										type="password"
										{...register("newPassword", {
											required: "This input is required.",
											pattern: {
												value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
												message:
													"Please involve at least 1 uppercase letter, 1 lowercase letter, and 1 number",
											},
											minLength: {
												value: 8,
												message: "This input must exceed 8 characters",
											},
											validate: (value) => {
												if (value === oldPassword) {
													return "New password must be different from the old password";
												}
												return true;
											},
										})}
										className="col-8 px-2 text-greeli-emphasis border-input-change-pass"
										id="newPassword"
										value={newPassword}
										onChange={(e) => {
											setNewPassword(e.target.value);
										}}
										style={{
											border: "solid white 1px",
											borderRadius: "4px",
											backgroundColor: "transparent",
											color: "white",
										}}
										aria-invalid={errors.newPassword ? "true" : "false"}
									/>
									{errors.newPassword && (
										<p className="error" role="alert">
											{errors.newPassword.message}
										</p>
									)}
								</div>
							</div>
						)}
						{!isChangingPassword && (
							<div className="d-flex justify-content-between">
								<p className="text-greeli-emphasis">Password</p>
								<button
									className="bg-primary-green-400 p-2 text-white rounded-pill border-none theme-button"
									onClick={() => {
										setIsChangingPassword(true);
									}}
									aria-label="Change Password"
								>
									Change Password
								</button>
							</div>
						)}
					</div>
					<div className="row d-flex flex-row justify-content-end g-1 mt-3">
						<button
							onClick={() => {
								close();
								setIsChangingPassword(false);
							}}
							className="col-4 mx-3 p-2 bg-danger text-white rounded-pill border-none theme-button"
						>
							Cancel Changes
						</button>
						<button
							// type="submit"
							className="col-4 mx-3 p-2 bg-primary-green-400 text-white rounded-pill border-none theme-button"
							onClick={() => {
								updateUserInfo(newPhoneNumber, newAddress, newGender, userId);
								isChangingPassword &&
									sendOldPassword(oldPassword, newPassword, userId);
								close();
								toast.success("Changes saved successfully");
								window.location.reload();
							}}
						>
							Save Changes
						</button>
					</div>
				</form>
			)}
		</Popup>
	);
};

export default EditInfoModal;
