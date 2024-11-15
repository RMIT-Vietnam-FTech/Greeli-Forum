import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
axios.defaults.withCredentials = true;
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
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (event) => {
		sendOldPassword(oldPassword, newPassword, userId);
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

	if (isEditing) {
		return (
			<div className="container-fluid text-greeli-emphasis info-item py-2">
				<Toaster />
				<form
					onSubmit={handleSubmit(onSubmit)}
					aria-label="Change Password Form"
				>
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
									message:
										"This input must exceed 8 characters",
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
					<div className="row d-flex flex-row justify-content-end g-1 mt-3">
						<button
							type="submit"
							className="col-4 mx-3 p-2 bg-primary-green-400 text-white rounded-pill border-none theme-button"
						>
							Change Password
						</button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className="d-flex justify-content-between">
				<p className="text-greeli-emphasis">Password</p>
				<button
					className="bg-primary-green-400 p-2 text-white rounded-pill border-none theme-button"
					onClick={() => {
						setIsEditing(true);
					}}
					aria-label="Change Password"
				>
					Change Password
				</button>
			</div>
		);
	}
};

export default ChangePassword;
