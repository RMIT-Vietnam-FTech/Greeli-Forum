import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaMap } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import * as Yup from "yup";
import { ThemeContext } from "../../context/ThemeContext";
import "../../scss/custom.css";
import "./Contact.css";
const Contact = () => {
	const { isDarkMode } = useContext(ThemeContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});
	const feedBackSchema = Yup.object().shape({
		name: Yup.string().required("Your name is required"),
		email: Yup.string()
			.required("Your email is required")
			.email("Email is invalid"),
		message: Yup.string().required("Your message is required"),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(feedBackSchema) });
	const feedback = () => {
		const configuration = {
			method: "post",
			url: baseUrl + "/api/feedback/create",
			data: {
				name,
				email,
				message,
			},
		};
		axios(configuration)
			.then((result) => {
				console.log(result);
				if (result.data) {
					toast.success("Send Feedback Successfully!", {
						duration: 2000,
						position: "top-center",
					});
				}
			})
			.catch((error) => {
				toast.error(error.response.data.error, {
					duration: 3000,
					position: "top-center",
				});
				console.log(error.response.data.error);
			});
	};
	const submitFeedBack = () => {
		feedback();
		setName("");
		setEmail("");
		setMessage("");
	};
	return (
		<>
			<Toaster />
			<main
				className="container-fluid bg-primary-green"
				// data-bs-theme={isDarkMode ? "dark" : "light"}
			>
				<div className="row justify-content-evenly">
					<div className="col-11 col-lg-5 flex-column my-lg-5 p-lg-5 rounded-4">
						<h1 className="my-4 text-light text-center text-lg-start">
							Contact Us
						</h1>
						<div className="d-flex contact-info mb-lg-4">
							<div className="icon-container text-center">
								<FaMap
									size={50}
									className="rounded-5 mx-2 my-lg-3 p-2 text-light bg-primary-yellow"
								/>
							</div>
							<div className="content-container align-content-center mb-4 mb-lg-0">
								<h4 className="text-light">Location</h4>
								<a
									href="https://www.google.com/maps/place/%C4%90%E1%BA%A1i+H%E1%BB%8Dc+RMIT+Nam+S%C3%A0i+G%C3%B2n/@10.7564486,106.6744068,14z/data=!4m10!1m2!2m1!1sRMIT+University!3m6!1s0x31752fbea5fe3db1:0xfae94aca5709003f!8m2!3d10.7289515!4d106.6957667!15sCg9STUlUIFVuaXZlcnNpdHkiA4gBAZIBEnByaXZhdGVfdW5pdmVyc2l0eeABAA!16s%2Fm%2F04g0808?hl=vi-VN&entry=ttu"
									className="text-light"
								>
									RMIT University Viet Nam
								</a>
							</div>
						</div>
						<div className="d-flex contact-info mb-lg-4">
							<div className="icon-container">
								<IoIosMail
									size={50}
									className="rounded-5 mx-2 my-lg-3 p-2 text-light bg-primary-yellow"
								/>
							</div>
							<div className="content-container align-content-center mb-4 mb-lg-0">
								<h4 className="text-light">Email</h4>
								<a
									href="mailto:ftech.admin@gmail.com"
									className=" text-light"
								>
									ftech.admin@gmail.com
								</a>
							</div>
						</div>
						<div className="d-flex contact-info mb-lg-4">
							<div className="icon-container">
								<FaPhone
									size={50}
									className="rounded-5 mx-2 my-lg-3 p-2 text-center text-light bg-primary-yellow"
								/>
							</div>
							<div className="content-container align-content-center mb-4 mb-lg-0">
								<h4 className="text-light">Phone</h4>
								<a
									href="tel:+84123456789"
									className=" text-light"
								>
									+84 123 456 789
								</a>
							</div>
						</div>
					</div>
					<div className="col-11 col-lg-5 text-center my-lg-5 p-5 mb-5 bg-light rounded-4">
						<h3 className="mb-4 fs-4">
							If you have any feedback, please contact us
						</h3>
						<form
							onSubmit={handleSubmit(submitFeedBack)}
							aria-label="login form"
						>
							<div className="form-floating mb-4">
								<input
									type="text"
									{...register("name")}
									className="form-control border border-primary-green"
									id="floatingInput"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<label
									id="floatingInput"
									htmlFor="floatingInput"
								>
									Your name
								</label>
							</div>
							{errors.name && (
								<p className="error text-start" tabIndex={0}>
									{errors.name.message}
								</p>
							)}
							<div className="form-floating mb-4">
								<input
									type="email"
									className="form-control border border-primary-green"
									{...register("email")}
									id="floatingEmail"
									placeholder="Your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label
									id="floatingInput"
									htmlFor="floatingInput"
								>
									Your email
								</label>
							</div>
							{errors.email && (
								<p className="error text-start" tabIndex={0}>
									{errors.email.message}
								</p>
							)}
							<div className="form-floating mb-4">
								<textarea
									className="form-control border border-primary-green h-auto"
									placeholder="Your message here..."
									id="floatingTextPlace"
									{...register("message")}
									rows={5}
									defaultValue={""}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<label
									id="floatingText"
									htmlFor="floatingTextarea"
								>
									Your message here...
								</label>
							</div>
							{errors.message && (
								<p className="error text-start" tabIndex={0}>
									{errors.message.message}
								</p>
							)}
							<button
								type="submit"
								className="btn btn-lg btn-outline-primary-green"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
};
export default Contact;
