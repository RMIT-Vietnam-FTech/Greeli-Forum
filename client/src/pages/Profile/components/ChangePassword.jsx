import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import axios from "axios";

const ChangePassword = (props) => {
	const { userId } = props;
	// console.log(userId);
	const [isEditing, setIsEditing] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { errors },
		formState: { isSubmitSuccessful },
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (event) => {
		sendOldPassword(oldPassword, newPassword, userId);
	};

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 		reset({ oldPassword: "", newPassword: "" });
	// 	}
	// }, [formState, reset]);

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
		// var isError = true;
		await axios(configuration)
			.then((result) => {
				// console.log(result.response.status);
				toast.success(result.data.message);
				setNewPassword("");
				setOldPassword("");
				// isError = false;
			})
			.catch((error) => {
				console.log("Error", error);
				toast.error(error.response.data.message);
			});
		// setIsEditing(isError);
	};

	// //COMPARE INPUT WITH SAVED PASSWORD
	// const comparePassword = (oldPassword) => {
	// 	return bcrypt.compareSync(oldPassword, currentPassword);
	// };
	// //----------------------------

	// //STORE NEW PASSWORD IN DATABASE
	// const storeNewPassword = (newPassword) => {
	// 	const salt = bcrypt.genSaltSync(10);
	// 	const hashPassword = bcrypt.hashSync(newPassword, salt);
	// 	const newBasicInfo = {
	// 		...basicInfo,
	// 		password: hashPassword,
	// 	};
	// 	updateBasicInfo(newBasicInfo);
	// };

	// //---------------------------

	if (isEditing) {
		return (
			<div className="container-fluid text-white info-item py-2">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row d-flex flex-row items-align-center g-1">
						<label for="oldPassword" className="col-4 px-2">
							Enter your old password
						</label>
						<input
							type="text"
							{...register("oldPassword", {
								required: "This input is required.",
							})}
							// {...register("oldPassword", {
							// 	validate: (value) => {
							// 		if (!comparePassword(value)) {
							// 			return "Old password is incorrect";
							// 		}
							// 		return true;
							// 	},
							// })}
							className="col-8 px-2"
							id="oldPassword"
							value={oldPassword}
							onChange={(e) => {
								setOldPassword(e.target.value);
							}}
							style={{
								border: "solid white 1px",
								borderRadius: "4px",
								backgroundColor:
									"transparent" /* Make input background transparent */,
								color: "white" /* Text color */,
							}}
						/>
						{errors.oldPassword && (
							<p className="error" tabIndex={0}>
								{errors.oldPassword.message}
							</p>
						)}
					</div>
					<div className="row d-flex flex-row items-align-center g-1 mt-3">
						<label for="newPassword" className="col-4 px-2">
							Enter your new password
						</label>
						<input
							type="text"
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
							className="col-8 px-2"
							id="newPassword"
							value={newPassword}
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
							style={{
								border: "solid white 1px",
								borderRadius: "4px",
								backgroundColor:
									"transparent" /* Make input background transparent */,
								color: "white" /* Text color */,
							}}
						/>
						{errors.newPassword && (
							<p className="error" tabIndex={0}>
								{errors.newPassword.message}
							</p>
						)}
					</div>
					<div className="row d-flex flex-row justify-content-end g-1 mt-3">
						<Button
							type="submit"
							className="col-4 mx-3"
							variant="primary-green"
						>
							Change Password
						</Button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className="d-flex justify-content-between">
				<p className="text-white">Password</p>
				<button
					className="bg-primary-green-400 text-white rounded-pill border-none"
					onClick={() => {
						setIsEditing(true);
					}}
				>
					Change Password
				</button>
			</div>
		);
	}
};

export default ChangePassword;
