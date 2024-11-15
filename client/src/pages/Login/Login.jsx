import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";

const Login = () => {
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();
	const location = useLocation();
	const { isDarkMode } = useContext(ThemeContext);
	const from = location.state?.from?.pathname || "/";
	const backgroundImage = 'url("/LoginBackground.png")';
	const [email, setEmail] = useState("");
	const [isLogin, setIsLogin] = useState(false);
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

	const login = async () => {
		const configuration = {
			method: "post",
			url: baseUrl + "/api/user/login",
			data: {
				email,
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
					setIsLogin(true);
				}
				// store user data in local storage
				localStorage.setItem("user", JSON.stringify(result.data));
				// set user context
				setUser(JSON.stringify(result.data));
				// navigate(from, { replace: true });
				setTimeout(() => {
					navigate(from, { replace: true });
				}, 1500);
			})
			.catch((error) => {
				toast.error(error.response.data.error, {
					duration: 2000,
					position: "top-center",
				});
				console.log(error);
			});
	};

	const onSubmit = async (e) => {
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

	// const handleKeyDown = (e) => {
	// 	if (e.key === "Enter") {
	// 		e.preventDefault();
	// 		onSubmit(handleSubmit(onSubmit));
	// 	}
	// };

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
				<div className="col-12 col-lg-6 text-center login py-5 bg-greeli-subtle">
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
							<div className="form-floating">
								<input
									name="email"
									type="text"
									{...register("email")}
									className="form-control text-body-color"
									id="floatingEmail"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
							<p className="error text-start" tabIndex={0}>
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
						<p className="mt-2 mb-1 text-center text-greeli-emphasis">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-primary-yellow"
								style={{ textDecoration: "none" }}
							>
								Register
							</Link>
						</p>
						<p className="mb-3 text-center text-greeli-emphasis">
							Forgot password?{" "}
							<Link
								to="/resetPassword"
								className="text-primary-yellow"
								style={{ textDecoration: "none" }}
							>
								Reset here
							</Link>
						</p>
					</form>
				</div>
			</div>
			{/* {isLogin && navigate(from, { replace: true })} */}
		</main>
	);
};

export default Login;
