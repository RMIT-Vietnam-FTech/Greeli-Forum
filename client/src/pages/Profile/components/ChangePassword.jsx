import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import * as bcrypt from "bcryptjs";

const ChangePassword = (props) => {
	const { basicInfo, updateBasicInfo } = props;
	const currentPassword = basicInfo.password;
	// const checked = bcrypt.compareSync("HLDQui110105ft", currentPassword);
	// console.log(checked);
	const [isEditing, setIsEditing] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (event) => {
		// event.preventDefault();
		setNewPassword("");
		setOldPassword("");
		setIsEditing(false);
		toast.success("Password Updated");
		storeNewPassword(newPassword);
		// comparePassword();
	};

	//COMPARE INPUT WITH SAVED PASSWORD
	const comparePassword = (oldPassword) => {
		return bcrypt.compareSync(oldPassword, currentPassword);
	};
	//----------------------------

	//STORE NEW PASSWORD IN DATABASE
	const storeNewPassword = (newPassword) => {
		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(newPassword, salt);
		const newBasicInfo = {
			...basicInfo,
			password: hashPassword,
		};
		updateBasicInfo(newBasicInfo);
	};

	//---------------------------

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
							// {...register("oldPassword")}
							{...register("oldPassword", {
								validate: (value) => {
									if (!comparePassword(value)) {
										return "Old password is incorrect";
									}
									return true;
								},
							})}
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
						<Button type="submit" className="col-4" variant="primary-green">
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
