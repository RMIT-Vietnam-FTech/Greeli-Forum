import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Reaptcha from "reaptcha";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import "../../scss/custom.css";

axios.defaults.withCredentials = true;

const getCharacterValidationError = (str) => {
	return `Your password must have at least 1 ${str} character`;
};

const Register = () => {
	const backgroundImage = 'url("/LoginBackground.png")';
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPasword] = useState("");
	const [verify, setVerify] = useState(true);
	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);
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
			.min(6, "Password must have at least 6 characters")
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
			url: baseUrl + "/api/user/register",
			data: {
				username,
				email,
				password,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data.message);
				toast.success("Register successfully!", {
					duration: 2000,
					position: "top-center",
				});
				setTimeout(() => {
					navigate("/login", { replace: true });
				}, 3000);
			})
			.catch((error) => {
				toast.error(error.response.data.error, {
					duration: 4000,
					position: "top-center",
				});
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
		registerAccount();
		setUsername("");
		setEmail("");
		setPassword("");
		setConfirmPasword("");
	};

	const showPasswordButton = () => {
		if (showPassword) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	};
	// fix biome by Bread, you can delete if it cause error
	// fix bio me start
	function useEnterKeySubmit(onSubmit) {
		const handleKeyDown = (event) => {
			if (event.key === "Enter") {
				onSubmit();
			}
		};

		useEffect(() => {
			document.addEventListener("keydown", handleKeyDown);

			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [handleKeyDown]);

		return handleKeyDown;
	}

	const handleKeyDown = useEnterKeySubmit(handleSubmit(onSubmit));
	// fix biome end

	const { isDarkMode } = useContext(ThemeContext);

	return (
		<main
			className="container-fluid"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="row">
				{/* <Toaster position="top-center" /> */}
				<div
					className="col-sm-12 col-lg-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
				/>
				<div className="col-12 col-lg-6 text-center login py-5 bg-greeli-subtle h-100">
					<h1 className="text-login-emphasis">GREELI</h1>
					<h1 className="text-greeli-emphasis">
						The guide to sustainable life
					</h1>
					<Image
						src={isDarkMode ? "/DarkLogo.svg" : "/LightLogo.svg"}
						width={120}
						className="my-2"
						alt="Greeli Forum Logo"
					/>
					<form
						className="mt-4 mx-3 px-md-5"
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={handleKeyDown}
						aria-label="register form"
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
									placeholder="greeli17"
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
							<p className="error" tabIndex={0}>
								{errors.username.message}
							</p>
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
									placeholder="greeli@example.com"
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
							<p className="error" tabIndex={0}>
								{errors.email.message}
							</p>
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
									type={showPassword ? "text" : "password"}
									{...register("password")}
									className="form-control"
									id="password"
									placeholder="password"
									value={password}
									autoComplete="on"
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
							<span
								className="input-group-text text-login-emphasis"
								onClick={showPasswordButton}
								aria-label="show password button"
								role="button"
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
						{errors.password && (
							<p className="error" tabIndex={0}>
								{errors.password.message}
							</p>
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
									type={showPassword ? "text" : "password"}
									{...register("confirmPassword")}
									className="form-control"
									id="confirmPassword"
									autoComplete="on"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPasword(e.target.value)
									}
								/>
								<label
									for="confirmPassword"
									className="text-greeli-emphasis"
								>
									Confirm Password
								</label>
							</div>
							<span
								className="input-group-text text-login-emphasis"
								onClick={showPasswordButton}
								aria-label="show password button"
								role="button"
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
						{errors.confirmPassword && (
							<p className="error">
								{errors.confirmPassword.message}
							</p>
						)}
						{/* <Reaptcha
              className=" mb-4"
              sitekey="6Ld2nt8pAAAAANB0gjy0_G2vdBy80t8NO5E_tv0E"
              ref={captchaRef}
              onVerify={verifyCaptcha}
              onLoad={onLoadCaptcha}
            /> */}
						<button
							className="btn btn-primary w-100 py-3"
							type="submit"
							// disabled={verify}
						>
							Register
						</button>
						<p className="mt-1 mb-3 text-center text-greeli-emphasis">
							Have an account?{" "}
							<Link
								to="/login"
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
