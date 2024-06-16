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

const ResetPassword = () => {
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();
	const location = useLocation();
	const { isDarkMode } = useContext(ThemeContext);
	const from = location.state?.from?.pathname || "/";
	const backgroundImage = 'url("/LoginBackground.png")';
	const [email, setEmail] = useState("");
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
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	const requestReset = async () => {
		const configuration = {
			method: "post",
			url: baseUrl + "/api/user/requestResetPassword",
			data: {
				email,
			},
			withCredentials: true,
		};
		axios(configuration)
			.then((result) => {
				console.log(result);
				if (result.data) {
					toast.success(result.data.message, {
						duration: 5000,
						position: "top-center",
					});
				}
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
		requestReset();
		setEmail("");
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
					<h3 className="text-greeli-emphasis px-2">
						Enter your email address to reset password
					</h3>
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
						<button
							className="btn btn-primary w-100 py-3"
							type="submit"
						>
							Reset Password
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

export default ResetPassword;
