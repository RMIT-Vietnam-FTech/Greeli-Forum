import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState, useContext } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import { FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "../../scss/custom.css";

// import "./sass/custom.css";

const Login = () => {
	const { user, setUser } = useUserContext();
	const cookies = new Cookies();
	const backgroundImage = 'url("LoginBackground.png")';
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const loginSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 6 characters")
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
			url: "http://localhost:3001/api/user/login",
			data: {
				email,
				password,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				cookies.set("TOKEN", result.data.token, {
					path: "/",
					maxAge: 60 * 60 * 24 * 5,
				});
				// store user data in local storage
				localStorage.setItem("user", JSON.stringify(result.data));
				// set user context
				setUser(JSON.stringify(result.data));
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

	const { isDarkMode } = useContext(ThemeContext);
	return (
		<main
			className="container-fluid login"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			{/* <div>{JSON.parse(user).id}</div> */}
			<div className="row">
				<div
					className=" col-sm-12 col-lg-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
				/>
				<div className="col-12 col-lg-6 text-center login py-5 bg-greeli-subtle">
					<h1 className="text-login-emphasis">GREELI</h1>
					<h1 className="text-greeli-emphasis">
						The guide to sustainable life
					</h1>
					<Image
						src={isDarkMode ? "DarkLogo.svg" : "LightLogo.svg"}
						width={120}
						className="my-2"
						alt="Greeli Forum Logo"
					/>
					<form
						className="mt-4 mx-3 px-md-5"
						onSubmit={handleSubmit(onSubmit)}
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
									id="floatingInput"
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
							<p className="error text-start">
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
									type="password"
									{...register("password")}
									className="form-control"
									id="floatingPassword"
									placeholder="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<label
									for="floatingPassword"
									className="text-greeli-emphasis"
								>
									Password
								</label>
							</div>
						</div>
						{errors.password && (
							<p className="error text-start mt-1">
								{errors.password.message}
							</p>
						)}
						<div className="form-check text-start my-3">
							<input
								className="form-check-input"
								type="checkbox"
								value="remember-me"
								id="flexCheckDefault"
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
		</main>
	);
};

export default Login;
