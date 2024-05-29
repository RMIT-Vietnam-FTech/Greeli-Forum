import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useProfileContext } from "../../../context/ProfileContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import { useUserContext } from "../../../context/UserContext";
import { PiPasswordBold } from "react-icons/pi";
import { FaKey } from "react-icons/fa";

const ChangePassword = (props) => {
	const { close } = props;
	const { isDarkMode } = useContext(ThemeContext);
	const data = useProfileContext();
	const { userId } = data;
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const { user, error, setError, setSuccess } = useUserContext();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		criteriaMode: "all",
	});

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
				setSuccess("Successfully Uploaded!");
				setNewPassword("");
				setOldPassword("");
			})
			.catch((error) => {
				console.log("Error", error);
				toast.error(error.response.data.message);
			});
	};

	const onSubmit = (event) => {
		sendOldPassword(oldPassword, newPassword, userId);
		close();
	};

	return (
		<div
			className="container-fluid text-greeli-emphasis p-4"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<h2>Change Password</h2>
			<form onSubmit={handleSubmit(onSubmit)} aria-label="Change Password Form">
				<div className="p-0 m-0 editing-input-wrapper">
					{/* OLD PASS INPUT */}
					<div
						className={
							errors.oldPassword
								? "input-group mb-4 input-error"
								: "input-group mb-4"
						}
					>
						<span className="input-group-text">
							<FaKey />
						</span>
						<div className="form-floating text-greeli-emphasis">
							<input
								name="oldPassword"
								type="password"
								{...register("oldPassword", {
									required: "This input is required.",
								})}
								className="form-control text-body-color"
								id="floatingOldPassword"
								value={oldPassword}
								placeholder="User#123"
								onChange={(e) => {
									setOldPassword(e.target.value);
								}}
								aria-invalid={errors.oldPassword ? "true" : "false"}
							/>
							<label htmlFor="floatingOldPassword">Old password</label>
						</div>
					</div>
					{errors.oldPassword && (
						<p className="error text-start" role="alert" tabIndex={0}>
							{errors.oldPassword.message}
						</p>
					)}

					{/* NEW PASS INPUT */}
					<div
						className={
							errors.oldPassword
								? "input-group mb-4 input-error"
								: "input-group mb-4"
						}
					>
						<span className="input-group-text">
							<PiPasswordBold />
						</span>
						<div className="form-floating text-greeli-emphasis">
							<input
								name="newPassword"
								type="password"
								placeholder="User#123"
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
								className="form-control text-body-color"
								id="floatingNewPassword"
								value={newPassword}
								onChange={(e) => {
									setNewPassword(e.target.value);
								}}
								// style={{
								// 	border: "solid white 1px",
								// 	borderRadius: "4px",
								// 	backgroundColor: "transparent",
								// 	color: "white",
								// }}
								aria-invalid={errors.newPassword ? "true" : "false"}
							/>
							<label htmlFor="newPassword">New password</label>
						</div>
					</div>
					{errors.newPassword && (
						<p className="error text-start" role="alert" tabIndex={0}>
							{errors.newPassword.message}
						</p>
					)}
				</div>

				<div className="row d-flex flex-row justify-content-between g-1 mt-3">
					<button
						// type="submit"
						className="btn btn-primary col-4 mx-3 p-2 bg-danger text-white rounded-pill border-0"
						onClick={() => {
							close();
							props.setEditTab("Profile");
						}}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="btn btn-primary col-4 mx-3 p-2 bg-primary-green-400 text-white rounded-pill border-0"
					>
						Change Password
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
