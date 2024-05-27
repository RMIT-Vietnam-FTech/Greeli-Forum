import React from "react";
import { AiFillInstagram, AiOutlineTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../scss/custom.css";
import "../Footer/footer.css";
export default function Footer() {
	return (
		<>
			<footer className="bg-primary-green-700 pt-5" id="footer-content">
				<div className="container d-flex flex-column flex-md-row">
					{/* Who are we Section */}
					<section
						className="container flex-column align-items-center align-items-md-start footer-section"
						id="intro"
					>
						<h3 className="fw-bold text-light">Who are we</h3>
						<p className="text-light">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Repellendus itaque earum, laudantium fugiat
							officiis odit ullam aut delectus ea magnam.
						</p>
						<img
							src="/logo.svg"
							alt="greeli logo"
							width={100}
							className="pt-5"
							id="weblogo"
						/>
					</section>

					{/* Important Link Section*/}
					<section className="container d-flex flex-column align-items-center footer-section">
						<h3 className="fw-bold text-light">Link</h3>
						<ul className="nav flex-column">
							<li className="mb-2">
								<Link
									to="/"
									className="nav-link d-inline p-0 text-light"
								>
									Home
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/general"
									className="nav-link d-inline p-0 text-light"
								>
									General
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/forum"
									className="nav-link d-inline p-0 text-light"
								>
									Forum
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/about"
									className="nav-link d-inline p-0 text-light"
								>
									About
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/contact"
									className="nav-link d-inline p-0 text-light"
								>
									Contact
								</Link>
							</li>
							<li className="mb-2">
								<Link
									to="/profile"
									className="nav-link d-inline p-0 text-light"
								>
									Profile
								</Link>
							</li>
						</ul>
					</section>

					{/* Contact Info Section*/}
					<section
						className="container d-flex flex-column align-items-center footer-section"
						id="contact-info"
					>
						<h3 className="fw-bold text-light">Contact Info</h3>
						<ul className="nav flex-column" id="contact-list">
							<li className="nav-item mb-2">
								<a
									href="/"
									className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
								>
									<GrMail size={20} />
									<span className="contact">
										business@greeli@gmail.com.vn
									</span>
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="/"
									className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
								>
									<FaFacebook size={20} />
									<span className="contact">
										business@greeli@gmail.com.vn
									</span>
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="/"
									className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
								>
									<AiFillInstagram size={20} />
									<span className="contact">
										business@greeli@gmail.com.vn
									</span>
								</a>
							</li>
							<li className="nav-item mb-2">
								<a
									href="/"
									className="nav-link d-inline-flex align-items-center gap-2 p-0 text-light"
								>
									<AiOutlineTikTok size={20} />
									<span className="contact">
										business@greeli@gmail.com.vn
									</span>
								</a>
							</li>
						</ul>
					</section>
				</div>
				{/* copyright of Greeli */}
				<div className="mx-lg-4 mt-5" id="copyright">
					<div className="text-light text-center py-3 px-4">
						Copyright ©2024 All rights reserved | This website is
						designed and built by{" "}
						<span className="text-primary-yellow">
							RMIT FTech Team
						</span>
					</div>
				</div>
			</footer>
		</>
	);
}
