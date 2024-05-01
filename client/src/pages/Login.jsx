import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import { FaUser,  FaKey  } from "react-icons/fa";
import * as Yup from "yup";

const Login = () => {
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
				console.log(result.data.message);
			})
			.catch((error) => {
				error = new Error();
				console.log(error);
			});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		login();
		setEmail("");
		setPassword("");
	};

	return (
		<main className="container-fluid">
			<div className="row">
				<div
					className="col-md-6 bg-image"
					style={{ backgroundImage, backgroundSize: "cover" }}
				></div>
				<div className="col-12 col-md-6 text-center login py-5">
					<h1>GREELI</h1>
					<h1>The guide to sustainable life</h1>
					<Image src="Logo.svg" width={150} className="my-4" />
					<form className="mt-4 mx-5 px-md-5" onSubmit={handleSubmit(onSubmit)}>
						<div className="input-group mb-4">
								<span className="input-group-text">
									<FaUser />
								</span>
								<div className="form-floating">
								<input
									name="email"
									type="text"
									{...register("email")}
									className="form-control"
									id="floatingInput"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label for="floatingInput">
									Email address
								</label>
								</div>
						</div>
						{errors.email && (
							<p className="error text-start">
								{errors.email.message}
							</p>
						)}
						<div className="input-group mb-2">
								<span className="input-group-text">
									<FaKey />
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
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label for="floatingPassword">
									Password
								</label>
								</div>
						</div>
						{errors.password && (
							<p className="error text-start mb-n2">
								{errors.password.message}
							</p>
						)}
						<div className="form-check text-start my-3">
							<input
								className="form-check-input"
								type="checkbox"
								value="remember-me"
								id="flexCheckDefault"
							/>
							<label
								className="form-check-label"
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
						<p className="mt-1 mb-3 text-center co">
							Don't have an account? <a href="#">Register</a>
						</p>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Login;
