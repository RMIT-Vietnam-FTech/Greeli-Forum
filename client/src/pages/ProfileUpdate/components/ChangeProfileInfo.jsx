import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { MdLocationOn, MdOutlineTransgender, MdPhone } from "react-icons/md";
import "reactjs-popup/dist/index.css";
import { useProfileContext } from "../../../context/ProfileContext";
import { useUserContext } from "../../../context/UserContext";

const ChangeProfileInfo = (props) => {
	const data = useProfileContext();
	const { userId, username, tel, address, gender } = data;
	const { close } = props;
	const { user, error, setError, setSuccess } = useUserContext();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);
	var currentGender = "";
	if (gender !== "Please update your gender") {
		currentGender = gender;
	}

	const [newUsername, setNewUsername] = useState(data?.username);
	const [newAddress, setnewAddress] = useState(data?.address);
	const [newPhoneNumber, setnewPhoneNumber] = useState(data?.tel);
	const [newGender, setNewGender] = useState(currentGender);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		criteriaMode: "all",
	});

	//UPLOAD USER INFO
	const updateUserInfo = async (
		newPhoneNumber,
		newAddress,
		newGender,
		userId,
	) => {
		const configuration = {
			method: "post",
			url: baseUrl + `/api/user/${userId}/update`,
			data: {
				...data,
				tel: newPhoneNumber,
				address: newAddress,
				gender: newGender,
			},
		};
		await axios(configuration)
			.then((result) => {
				toast.success(result.data.message);
				setSuccess("Successfully Uploaded!");
			})
			.catch((error) => {
				console.log("Error", error);
				toast.error(error.response.data.message);
			});
	};
	// ----------------------------

	const onSubmit = (e) => {
		updateUserInfo(newPhoneNumber, newAddress, newGender, userId);
		close();
	};
	return (
		<form
			className="p-4 text-greeli-emphasis"
			onSubmit={handleSubmit(onSubmit)}
			aria-label="Change Profile Form"
		>
			<h2>Change Profile Info</h2>
			<div
				className={
					errors.newPhoneNumber
						? "input-group mb-4 input-error"
						: "input-group mb-4"
				}
			>
				<span className="input-group-text">
					<FaUser />
				</span>
				<div className="form-floating text-greeli-emphasis">
					<input
						type="text"
						name="newUsername"
						{...register("newUsername", {
							minLength: {
								value: 8,
								message:
									"This input must be at least 8 characters",
							},
						})}
						className="form-control text-body-color"
						id="floatingNewUserName"
						value={newUsername}
						placeholder="Diemqui11t1"
						onChange={(e) => {
							setNewUsername(e.target.value);
						}}
						aria-invalid={errors.newUsername ? "true" : "false"}
					/>
					<label htmlFor="floatingNewUsername">Username</label>
				</div>
			</div>
			{errors.newUsername && (
				<p className="error" role="alert">
					{errors.newUsername.message}
				</p>
			)}

			<div
				className={
					errors.newPhoneNumber
						? "input-group mb-4 input-error"
						: "input-group mb-4"
				}
			>
				<span className="input-group-text">
					<MdPhone />
				</span>
				<div className="form-floating text-greeli-emphasis">
					<input
						type="text"
						name="newPhoneNumber"
						{...register("newPhoneNumber", {
							maxLength: {
								value: 10,
								message:
									"This input must at least 10 characters",
							},
						})}
						className="form-control text-body-color"
						id="floatingNewPhoneNumber"
						value={newPhoneNumber}
						placeholder="0123456789"
						onChange={(e) => {
							setnewPhoneNumber(e.target.value);
							// console.log(newPhoneNumber);
						}}
						aria-invalid={errors.newPhoneNumber ? "true" : "false"}
					/>
					<label htmlFor="floatingNewPhoneNumber">Phone Number</label>
				</div>
			</div>
			{errors.newPhoneNumber && (
				<p className="error" role="alert">
					{errors.newPhoneNumber.message}
				</p>
			)}

			<div
				className={
					errors.newAddress
						? "input-group mb-4 input-error"
						: "input-group mb-4"
				}
			>
				<span className="input-group-text">
					<MdLocationOn />
				</span>
				<div className="form-floating text-greeli-emphasis">
					<input
						type="text"
						{...register("newAddress", {
							maxLength: {
								value: 50,
								message:
									"This input must not exceed 50 characters",
							},
						})}
						className="form-control text-body-color"
						id="newAddress"
						value={newAddress}
						placeholder="702, Nguyen Van Linh, District 7"
						onChange={(e) => {
							setnewAddress(e.target.value);
						}}
						aria-invalid={errors.newAddress ? "true" : "false"}
					/>
					<label htmlFor="newAddress">Address</label>
				</div>
			</div>
			{errors.newAddress && (
				<p className="error" role="alert">
					{errors.newAddress.message}
				</p>
			)}

			<div
				className={
					errors.newGender
						? "input-group mb-4 input-error"
						: "input-group mb-4"
				}
			>
				<span className="input-group-text">
					<MdOutlineTransgender />
				</span>
				<div className="form-floating text-greeli-emphasis">
					<select
						name="cars"
						id="cars"
						className="form-control text-body-color"
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
					<label htmlFor="newGender">Gender</label>
				</div>
			</div>

			<div className="row d-flex flex-row justify-content-between g-1 mt-3">
				<button
					// type="submit"
					className="btn btn-primary col-4 mx-3 p-2 bg-danger text-white rounded-pill border-0 theme-button"
					onClick={() => {
						close();
						props.setEditTab("Profile");
					}}
				>
					Cancel
				</button>
				<button
					type="submit"
					className="btn btn-primary col-4 mx-3 p-2 bg-primary-green-400 text-white rounded-pill border-0 theme-button"
				>
					Save Changes
				</button>
			</div>
		</form>
	);
};

export default ChangeProfileInfo;
