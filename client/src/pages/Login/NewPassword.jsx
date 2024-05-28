import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useContext } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";

const NewPassword = () => {
	const { user, setUser } = useUserContext();
	const token = useParams().token;
	const userId = useParams().userId;
	const navigate = useNavigate();
	const location = useLocation();
	const { isDarkMode } = useContext(ThemeContext);
	const from = location.state?.from?.pathname || "/";
	const backgroundImage = 'url("/LoginBackground.png")';
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPasword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const getCharacterValidationError = (str) => {
		return `Your password must have at least 1 ${str} character`;
	};

	const loginSchema = Yup.object().shape({
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
	} = useForm({ resolver: yupResolver(loginSchema) });

	const submitNewPassword = async () => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/resetPassword/${token}/${userId}`,
			data: {
				password,
			},
			withCredentials: true,
		};
		axios(configuration)
			.then((result) => {
				if (result.data) {
					toast.success(result.data.message, {
						duration: 2000,
						position: "top-center",
					});
				}
				setTimeout(() => {
					navigate("/login", { replace: true });
				}, 1500);
			})
			.catch((error) => {
				toast.error(error.response.data.error, {
					duration: 2000,
					position: "top-center",
				});
				console.log(error.response.data.error);
			});
	};

	const onSubmit = async (e) => {
		submitNewPassword();
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

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSubmit(handleSubmit(onSubmit));
		}
	};

	return (
		<main
			className="container-fluid login"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			{/* <div>{JSON.parse(user).id}</div> */}
			<div className="row">
				{/* <Toaster position="top-center" /> */}
				{/* {(isLogin === true) && (toast.success("success"))} */}
				<div
					className=" col-sm-12 col-lg-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
					aria-label="background image"
				/>
				<div className="col-12 col-lg-6 text-center login py-5 bg-greeli-subtle d-flex flex-column justify-content-center">
					<h1 className="text-login-emphasis">GREELI</h1>
					<h3 className="text-greeli-emphasis">
						Enter your new password
					</h3>
					<form
						className="mt-4 mx-3 px-md-5"
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={handleKeyDown}
						aria-label="login form"
					>
						<div
							className={
								errors.password
									? "input-group mb-4 input-error"
									: "input-group mb-4"
							}
						>
							<span
								className="input-group-text"
								aria-label="email address icon"
							>
								<FaKey
									className="text-login-emphasis"
									alt="email address icon"
								/>
							</span>
							<div className="form-floating">
								<input
									name="password"
									type={showPassword ? "text" : "password"}
									{...register("password")}
									className="form-control"
									id="floatingPassword"
									placeholder="password"
									value={password}
									autoComplete="on"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<label
									for="floatingPassword"
									className="password text-greeli-emphasis"
								>
									Password
								</label>
							</div>
							<span
								className="input-group-text text-login-emphasis"
								onClick={() => {
									showPasswordButton();
								}}
								aria-label="show password button"
								role="button"
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
						{errors.password && (
							<p className="error text-start mt-1" tabIndex={0}>
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
							<p className="error" tabIndex={0}>
								{errors.confirmPassword.message}
							</p>
						)}
						<button
							className="btn btn-primary w-100 py-3"
							type="submit"
						>
							Create New Password
						</button>
						<p className="mt-1 mb-3 text-center text-greeli-emphasis">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-primary-yellow"
								style={{ textDecoration: "none" }}
							>
								Register
							</Link>
						</p>
					</form>
				</div>
			</div>
			{/* {isLogin && navigate(from, { replace: true })} */}
		</main>
	);
};

export default NewPassword;
