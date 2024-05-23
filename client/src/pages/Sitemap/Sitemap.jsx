import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Sitemap.css";

const Sitemap = () => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<section
			aria-label="sitemap"
			className="text-greeli-emphasis bg-greeli-subtle d-flex flex-column p-5 gap-2"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<Link to="/" className="text-greeli-emphasis link">
				Home page
			</Link>
			<Link to="/general" className="text-greeli-emphasis link">
				General page
			</Link>
			<Link to="/" className="text-greeli-emphasis link">
				Homepage
			</Link>
			<Link to="/contact" className="text-greeli-emphasis link">
				Contact page
			</Link>
			<Link to="/profile" className="text-greeli-emphasis link">
				Profile page
			</Link>
			<Link to="/chat" className="text-greeli-emphasis link">
				Chat page
			</Link>
			<Link to="/forum" className="text-greeli-emphasis link">
				Forum page
			</Link>
			<Link to="/sitemap" className="text-greeli-emphasis link">
				Sitemap
			</Link>
		</section>
	);
};

export default Sitemap;
