import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const getCharacterValidationError = (str) => {
	return `Your password must have at least 1 ${str} character`;
};

const Register = () => {
	const backgroundImage = 'url("LoginBackground.png")';
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const registerSchema = Yup.object().shape({
		username: Yup.string()
			.required("Username is required")
			.min(5, "Username must be at least 5 characters")
			.max(20, "Username must not exceed 20 characters"),
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must have at least 8 characters")
			// different error messages for different requirements
			.matches(/[0-9]/, getCharacterValidationError("digit"))
			.matches(/[a-z]/, getCharacterValidationError("lowercase"))
			.matches(/[A-Z]/, getCharacterValidationError("uppercase")),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf(
				[Yup.ref("password"), null],
				"Confirm Password does not match",
			),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(registerSchema) });

	const registerAccount = () => {
		const configuration = {
			method: "post",
			url: "http://localhost:3001/api/user/register",
			data: {
				username,
				email,
				password,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.msg);
			})
			.catch((error) => {
				error = new Error();
				console.log(error);
			});
	};

	const onSubmit = () => {};

	return (
		<main className="w-screen px-0">
			<div className="row">
				<div
					className="col-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
				></div>
				<div className="col-6 text-center login py-5">
					<h1>GREELI</h1>
					<h1>The guide to sustainable life</h1>
					<Image src="Logo.svg" width={150} className="my-4" />
					<form
						className="mt-4 mx-5 px-5"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="form-floating mt-4 d-flex align-items-center">
							<input
								name="username"
								type="text"
								{...register("username")}
								className="form-control"
								id="floatingUsername"
								placeholder="Password"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label for="floatingUsername">Username</label>
						</div>
						{errors.username && (
							<span className="error">
								{errors.username.message}
							</span>
						)}
						<div className="form-floating mt-4 d-flex align-items-center">
							<input
								name="email"
								type="text"
								{...register("email")}
								className="form-control"
								id="floatingEmail"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label for="floatingEmail">Email</label>
						</div>
						{errors.email && (
							<span className="error">
								{errors.email.message}
							</span>
						)}
						<div className="form-floating mt-4 d-flex align-items-center">
							<input
								name="password"
								type="password"
								{...register("password")}
								className="form-control"
								id="floatingPassword"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label for="floatingPassword align-items-center">
								Password
							</label>
						</div>
						{errors.password && (
							<span className="error">
								{errors.password.message}
							</span>
						)}
						<div className="form-floating mt-4 d-flex align-items-center">
							<input
								name="confirmPassword"
								type="password"
								{...register("confirmPassword")}
								className="form-control"
								id="floatingConfirmPassword"
								placeholder="Confirm Password"
							/>
							<label for="floatingConfirmPassword">
								Confirm Password
							</label>
						</div>
						{errors.confirmPassword && (
							<span className="error">
								{errors.confirmPassword.message}
							</span>
						)}
						<button
							className="btn btn-primary w-100 py-3"
							type="submit"
						>
							Register
						</button>
						<p className="mt-1 mb-3 text-center co">
							Have an account? <a href="#">Login</a>
						</p>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Register;
