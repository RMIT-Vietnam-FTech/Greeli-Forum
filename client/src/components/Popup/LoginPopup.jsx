import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { PopupContext } from "../../context/PopupContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
axios.defaults.withCredentials = true;

export default function LoginPopup() {
	const { isDarkMode } = useContext(ThemeContext);
	const popupContext = useContext(PopupContext);
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	const loginSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters")
			.max(40, "Password must not exceed 40 characters"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	const login = () => {
		const configuration = {
			method: "post",
			url: baseUrl + "/api/user/login",
			data: {
				email,
				password,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				// store user data in local storage
				localStorage.setItem("user", JSON.stringify(result.data));
				// set user context
				setUser(JSON.stringify(result.data));
				// navigate(<Outlet />, { replace: true });
				popupContext.setIsPopup(false);
				// window.location.reload();
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});
	};

	const onSubmit = (e) => {
		login();
		setEmail("");
		setPassword("");
	};

	const showPasswordButton = () => {
		if (showPassword) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	};
	// This is for fix biome by Bread, you can delete if u want
	// fix biome start
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
	// fix biome ends
	return (
		<div data-bs-theme={isDarkMode ? "dark" : "light"}>
			<div
				className={`modal ${popupContext.isPopup ? "show" : ""}`}
				tabIndex="-1"
				role="dialog"
				style={{ display: popupContext.isPopup ? "block" : "none" }}
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="exampleModalLabel"
							>
								Login to continue
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => {
									popupContext.setIsPopup(false);
								}}
							/>
						</div>
						<div className="modal-body">
							<form
								className="mt-4 mx-3 px-md-5"
								onSubmit={handleSubmit(onSubmit)}
								onKeyDown={handleKeyDown}
								aria-label="login form"
							>
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
									<div
										className="form-floating"
										role="textbox"
									>
										<input
											name="email"
											type="text"
											{...register("email")}
											className="form-control text-body-color"
											id="floatingInput"
											placeholder="name@example.com"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
										<label
											for="floatingInput"
											className="text-greeli-emphasis"
										>
											Email address
										</label>
									</div>
								</div>
								{errors.email && (
									<p
										className="error text-start"
										tabIndex={0}
									>
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
									<span
										className="input-group-text"
										aria-label="email address icon"
									>
										<FaKey
											className="text-login-emphasis"
											alt="email address icon"
										/>
									</span>
									<div
										className="form-floating"
										role="textbox"
									>
										<input
											name="password"
											type={
												showPassword
													? "text"
													: "password"
											}
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
										onClick={showPasswordButton}
										// onKeyUp={handleKeyUp} // Just add to fix biome
										aria-label="show password button"
										role="button"
									>
										{showPassword ? (
											<FaEye />
										) : (
											<FaEyeSlash />
										)}
									</span>
								</div>
								{errors.password && (
									<p
										className="error text-start mt-1"
										tabIndex={0}
									>
										{errors.password.message}
									</p>
								)}
								<div className="form-check text-start my-3">
									<input
										className="form-check-input"
										type="checkbox"
										value="remember-me"
										id="flexCheckDefault"
										aria-checked="true"
										checked
									/>
									<label
										className="form-check-label text-greeli-emphasis"
										for="flexCheckDefault"
									>
										Remember me
									</label>
								</div>
								<button
									className="btn btn-primary w-100 py-3"
									type="submit"
								>
									Sign in
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
				</div>
			</div>

			{/* Dark overlay */}
			{popupContext.isPopup && (
				<div className="modal-backdrop fade show" />
			)}
		</div>
	);
}
