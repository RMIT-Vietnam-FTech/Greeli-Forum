import React from "react";
import "../style/header.css";

const Header = () => {
	return (
		<>
			<header>
				{/* This div creates the transparent overlay over the video. */}
				<div className="overlay" />

				{/* This is video for the background. */}
				<video
					className="w-100 position-relative"
					id="video"
					autoPlay
					muted
					loop
					playsInline
				>
					<source src="/Forest.mp4" />
				</video>

				{/* Text content */}
				<div className="container-fluid h-100 align-content-center text-center text-white content">
					<h1 className="display-1 fw-semibold greeli-title">
						Welcome to{" "}
						<span className="text-primary-yellow">Greeli</span>
					</h1>
					<h3
						className="display-4 fw-semibold greeli-title"
						id="hero-text"
					>
						The guide to sustainable living
					</h3>
				</div>
			</header>
		</>
	);
};

export default Header;
