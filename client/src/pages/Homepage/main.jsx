import React, { useState, useContext } from "react";
import { FaNewspaper } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContext";
import { useUserContext } from "../../context/UserContext";
import "../../scss/custom.css";
import "../Homepage/style/main.css";
import NewsData from "./data/new";
import Jumbotron from "./jumbotron";
import NewList from "./newsItems";

export default function Main() {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<>
			<main
				className="bg-greeli-subtle"
				data-bs-theme={isDarkMode ? "dark" : "light"}
			>
				{/* About Section */}
				<section
					className="p-4 bg-greeli-subtle mx-5 rounded-5"
					id="about-section"
				>
					<div className="container mt-5 mx-auto">
						<div className="text-center px-4">
							<h1 className="fw-bold display-3 pb-4 text-error-emphasis">
								What is{" "}
								<span className="text-primary-yellow">
									Greeli
								</span>
								?
							</h1>
							<p className="col-lg-8 mx-auto fs-5 pb-5 text-greeli-emphasis">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam consectetur totam
								quibusdam animi nulla omnis deleniti aliquid!
								Veritatis distinctio voluptatem dicta quisquam
								sit voluptate odit, placeat illo, sunt unde
								nulla? Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Alias voluptatum minus fugiat
								tempora, natus corrupti. Soluta incidunt aut
								officiis adipisci earum impedit minima itaque
								quod non voluptatibus, modi tempora beatae?
							</p>
							<div className="d-inline-flex">
								<button
									className="text-center text-white btn theme-button bg-primary-green-700 btn-lg px-5 py-3 rounded-pill fw-bold"
									type="button"
								>
									Read more
								</button>
							</div>
						</div>
					</div>
				</section>
				{/* About Section End */}

				{/* Feature Section */}
				<section
					className="p-4 bg-primary-green mx-5 rounded-5 "
					id="features"
				>
					<h1 className="fw-bold text-center text-primary-yellow pb-2 my-5">
						Our Solution
					</h1>
					<div className="container-fluid px-4 my-5 ">
						<div className="row gx-3 justify-content-between solution-container">
							<div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 solution-item">
								<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
									<HiMiniUserGroup size={40} />
								</div>
								<h5 className="fw-bolder text-primary-yellow mb-3">
									Collaborative Forum
								</h5>
								<p className="text-white">
									Paragraph of text beneath the heading to
									explain the heading. We'll add onto it with
									another sentence and probably just keep
									going until we run out of words.
								</p>
							</div>
							<div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 mx-auto solution-item">
								<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
									<IoChatbubbles size={40} />
								</div>
								<h5 className="fw-bolder text-primary-yellow mb-3">
									Real-time Chatting
								</h5>
								<p className="text-white">
									Paragraph of text beneath the heading to
									explain the heading. We'll add onto it with
									another sentence and probably just keep
									going until we run out of words.
								</p>
							</div>
							<div className="col-md-3 col-12 mb-5 mb-lg-0 px-2 solution-item">
								<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
									<FaNewspaper size={40} />
								</div>
								<h5 className="fw-bolder text-primary-yellow mb-3">
									Updating Informative Platform
								</h5>
								<p className="text-white">
									Paragraph of text beneath the heading to
									explain the heading. We'll add onto it with
									another sentence and probably just keep
									going until we run out of words.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* Feature Section End */}

				{/* Recommend post Section */}
				<section>
					<NewList className="p-4 bg-white mx-5" data={NewsData} />
				</section>
				{/* Recommend post Section End */}

				{/* Jumbotron Section */}
				<section>
					<Jumbotron />
				</section>
				{/* Jumbotron Section End */}
			</main>
		</>
	);
}
