import React, { useState, useContext } from "react";
import { FaNewspaper } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext.jsx";
import { useUserContext } from "../../../context/UserContext.jsx";
import "../style/main.css";
import FAQ from "./FaQ.jsx";
import Posts from "./RecommendPost.jsx";
import TeamMember from "./TeamMember.jsx";
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
					<h1 className="display-5 fw-semibold text-greeli-emphasis mb-3">
						What is <span className="highlight-text">Greeli</span>?
					</h1>
					<p className="fs-5 text-greeli-emphasis text-center mb-3 p-3">
						Greeli is your gateway to a greener tomorrow! We're more
						than information - we're a vibrant community passionate
						about sustainable living. At Greeli, you'll find a
						treasure trove of resources to jumpstart or elevate your
						eco-journey, no matter your experience level. We offer
						practical guides, inspiring stories, and expert advice
						to empower you to make eco-conscious choices for your
						home, health, and the planet. Join us as we explore ways
						to conserve resources, embrace renewable energy, and
						minimize waste. Discover the joy of local living,
						sustainable fashion, and creating a haven for nature in
						your own backyard. Greeli is your one-stop shop for
						sustainable living, with a passionate community cheering
						you on every step of the way. Let's grow a greener
						future, together!
					</p>
					{/* <Link to="/about" className="d-block">
            <button
              className="text-center text-white read-more-btn bg-primary-green px-5 py-3 rounded-pill fw-bold"
              type="button"
            >
              Read more
            </button>
          </Link> */}
				</div>
			</section>

			{/* Our Solution */}
			<section className="mx-md-5 mx-4 p-5 my-md-5 my-3 bg-primary-green rounded-5 section">
				<h1 className="display-5 fw-semibold text-center text-primary-yellow w-100 mb-3">
					Our Solution
				</h1>
				<div className="container d-flex flex-column flex-md-row p-3 p-md-0">
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<HiMiniUserGroup size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Collaborative Forum
						</h5>
						<p className="fw-bolder text-white text-start">
							Engage in our collaborative forum, where passionate
							individuals share knowledge, exchange ideas, and
							inspire one another on their sustainable paths.
						</p>
					</div>
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<IoChatbubbles size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Real-time Chatting
						</h5>
						<p className="fw-bolder text-white text-start">
							Need a quick tip or want to discuss something
							privately? Our real-time chat lets you connect with
							fellow Greeli members for instant eco-advice and
							support.
						</p>
					</div>
					<div className="p-md-4 w-60 w-md-100 text-center solution-item">
						<div className="feature d-inline-block center text-primary-yellow rounded-4 mb-3">
							<FaNewspaper size={40} />
						</div>
						<h5 className="fw-bolder text-primary-yellow mb-3">
							Informative Platform
						</h5>
						<p className="fw-bolder text-white text-start">
							Stay up-to-date with the latest sustainable news and
							events! Greeli delivers valuable resources to keep
							you informed and inspired on your journey to a
							greener future.
						</p>
					</div>
				</div>
			</section>

			{/* Recommend Post */}
			<section className="mx-md-5 mx-4 px-5 py-3 my-md-5 my-3 bg-greeli-subtle rounded-5 section">
				<h1 className="display-5 fw-semibold text-center text-greeli-emphasis w-100 mb-3">
					Greeli Posts
				</h1>
				<Posts />
				<Link to="/forum" className="d-block text-center ">
					<button
						className="text-white read-more-btn bg-primary-green px-5 py-3 mt-3 rounded-pill fw-bold"
						type="button"
					>
						Visit Forum
					</button>
				</Link>
			</section>

			{/* Team Member */}
			<section className="mx-md-5 mx-4 px-5 py-0 my-md-5 my-3 bg-greeli-subtle rounded-5 section">
				<TeamMember />
			</section>

			{/* FQA */}
			<section className="mx-md-5 mx-4 px-5 py-0 bg-greeli-subtle rounded-5 section">
				<h1 className="display-5 fw-semibold text-center text-greeli-emphasis w-100 mb-3">
					Greeli FAQs
				</h1>
				<FAQ />
			</section>
		</main>
	);
};

export default Main;
