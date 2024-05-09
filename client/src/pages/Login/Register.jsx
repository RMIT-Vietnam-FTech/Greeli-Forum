import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Reaptcha from "reaptcha";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import "../../scss/custom.css";
const getCharacterValidationError = (str) => {
	return `Your password must have at least 1 ${str} character`;
};

const Register = () => {
	const backgroundImage = 'url("LoginBackground.png")';
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verify, setVerify] = useState(true);
	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);

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
				console.log(result.data.message);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const verifyCaptcha = () => {
		captchaRef.current.getResponse().then((result) => {
			setCaptchaToken(result);
			setVerify(false);
			console.log(verify);
		});
	};

	const onLoadCaptcha = () => {};

	const onSubmit = (e) => {
		// e.preventDefault();
		registerAccount();
		setUsername("");
		setEmail("");
		setPassword("");
	};

	const { isDarkMode } = useContext(ThemeContext);

	return (
		<main
			className="container-fluid h-100"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="row">
				<div
					className="col-md-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
				/>
				<div className="col-12 col-md-6 text-center py-5 bg-greeli-subtle">
					<h1 className="text-login-emphasis">GREELI</h1>
					<h1 className="text-greeli-emphasis">
						The guide to sustainable life
					</h1>
					<Image
						src={isDarkMode ? "DarkLogo.svg" : "LightLogo.svg"}
						width={120}
						className="my-4"
						alt="Greeli Forum Logo"
					/>
					<form
						className="mt-4 mx-3 px-md-5"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div
							className={
								errors.username
									? "input-group mb-4 input-error"
									: "input-group mb-4"
							}
						>
							<span className="input-group-text">
								<FaUser className="text-login-emphasis" />
							</span>
							<div className="form-floating">
								<input
									name="username"
									type="text"
									{...register("username")}
									className="form-control"
									id="username"
									placeholder="name@example.com"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
								<label
									for="username"
									className="text-greeli-emphasis"
								>
									Username
								</label>
							</div>
						</div>
						{errors.username && (
							<p className="error">{errors.username.message}</p>
						)}
						<div
							className={
								errors.email
									? "input-group mb-4 input-error"
									: "input-group mb-4"
							}
						>
							<span className="input-group-text">
								<MdEmail className="text-login-emphasis" />
							</span>
							<div className="form-floating">
								<input
									name="email"
									type="text"
									{...register("email")}
									className="form-control"
									id="email"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label
									for="email"
									className="text-greeli-emphasis"
								>
									Email address
								</label>
							</div>
						</div>
						{errors.email && (
							<p className="error">{errors.email.message}</p>
						)}
						<div
							className={
								errors.password
									? "input-group mb-4 input-error"
									: "input-group mb-4"
							}
						>
							<span className="input-group-text">
								<FaKey className="text-login-emphasis" />
							</span>
							<div className="form-floating">
								<input
									name="password"
									type="password"
									{...register("password")}
									className="form-control"
									id="password"
									placeholder="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<label
									for="password"
									className="text-greeli-emphasis"
								>
									Password
								</label>
							</div>
						</div>
						{errors.password && (
							<p className="error">{errors.password.message}</p>
						)}
						<div
							className={
								errors.confirmPassword
									? "input-group mb-4 input-error"
									: "input-group mb-4"
							}
						>
							<span className="input-group-text">
								<FaKey className="text-login-emphasis" />
							</span>
							<div className="form-floating">
								<input
									name="confirmPassword"
									type="password"
									{...register("confirmPassword")}
									className="form-control"
									id="confirmPassword"
									placeholder="Confirm Password"
								/>
								<label
									for="confirmPassword"
									className="text-greeli-emphasis"
								>
									Confirm Password
								</label>
							</div>
						</div>
						{errors.confirmPassword && (
							<p className="error">
								{errors.confirmPassword.message}
							</p>
						)}
						<Reaptcha
							className=" mb-4"
							sitekey="6LeZuswpAAAAAJsWzzaLYK_ZmUoPAhJO0Sns-qlx"
							ref={captchaRef}
							onVerify={verifyCaptcha}
							onLoad={onLoadCaptcha}
						/>
						<button
							className="btn btn-primary w-100 py-3"
							type="submit"
							disabled={verify}
						>
							Register
						</button>
						<p className="mt-1 mb-3 text-center text-greeli-emphasis">
							Have an account?{" "}
							<Link
								to="/"
								className="text-primary-yellow"
								style={{ textDecoration: "none" }}
							>
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Register;
