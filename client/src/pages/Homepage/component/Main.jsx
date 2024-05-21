import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";
import { ThemeContext } from "../../../context/ThemeContext.jsx";
import { useUserContext } from "../../../context/UserContext.jsx";
import "../style/Main.css";
import Posts from "./RecommendPost.jsx";
// import NewsData from "./data/new";
// import NewList from "./newsItems";

const Main = () => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<main
			className="bg-greeli-subtle w-100"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			{/* What is Greeli?  */}
			<section className="mx-md-5 mx-4 mb-md-5 mb-3 bg-greeli-subtle rounded-5 section introduction">
				<div className="col-12 pt-5 pb-4 mx-auto text-center">
					<h1 className="display-4 fw-semibold text-greeli-emphasis mb-3">
						What is{" "}
						<span className="text-primary-yellow">Greeli</span>?
					</h1>
					<p className="fs-5 text-greeli-emphasis text-justify mb-3 p-3">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
						consectetur totam quibusdam animi nulla omnis deleniti aliquid!
						Veritatis distinctio voluptatem dicta quisquam sit voluptate odit,
						placeat illo, sunt unde nulla? Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. Alias voluptatum minus fugiat tempora,
						natus corrupti. Soluta incidunt aut officiis adipisci earum impedit
						minima itaque quod non voluptatibus, modi tempora beatae? Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. 	
					</p>
					<Link to="/about" className="d-inline-flex">
						<button
							className="text-center text-white btn btn-lg read-more bg-primary-green-700 px-5 py-3 rounded-pill fw-bold"
							type="button"
						>
							Read more
						</button>
					</Link>
				</div>
			</section>

			{/* Our Solution */}
			<section className="mx-md-5 mx-4 p-5 my-md-5 my-3 bg-primary-green rounded-5 section">
				<h1 className="d-block display-4 fw-semibold text-center text-primary-yellow w-100">
					Our Solution
				</h1>
				<div className="container d-flex flex-column flex-md-row p-0 ">
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<HiMiniUserGroup size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Collaborative Forum
						</h5>
						<p className="text-white text-justify">
							Paragraph of text beneath the heading to explain the
							heading. We'll add onto it with another sentence and
							probably just keep going until we run out of words.
						</p>
					</div>
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<IoChatbubbles size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Real-time Chatting
						</h5>
						<p className="text-white text-justify">
							Paragraph of text beneath the heading to explain the
							heading. We'll add onto it with another sentence and
							probably just keep going until we run out of words.
						</p>
					</div>
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<FaNewspaper size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Informative Platform
						</h5>
						<p className="text-white text-justify">
							Paragraph of text beneath the heading to explain the
							heading. We'll add onto it with another sentence and
							probably just keep going until we run out of words.
						</p>
					</div>
				</div>
			</section>

			{/* Recommend Post */}
			<section className="mx-md-5 mx-4 p-4 bg-greeli-subtle rounded-5 section">
				<h2 className="d-block fw-semibold text-center text-greeli-emphasis w-100">
					Recommend Post
				</h2>
				<Posts />
				<div className="d-block text-center mt-2">
					<button
						className="text-white btn btn-lg read-more bg-primary-green-700 px-5 py-3 rounded-pill fw-bold"
						type="button"
					>
						Read more
					</button>
				</div>
			</section>
		</main>
	);
};

export default Main;
