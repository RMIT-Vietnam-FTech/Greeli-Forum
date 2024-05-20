import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Sitemap = () => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<section
			aria-label="sitemap"
			className="text-greeli-emphasis bg-greeli-subtle d-flex flex-column p-5 gap-2"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<Link to="/" className="text-greeli-emphasis">
				Home page
			</Link>
			<Link to="/general" className="text-greeli-emphasis">
				General page
			</Link>
			<Link to="/" className="text-greeli-emphasis">
				Homepage
			</Link>
			<Link to="/contact" className="text-greeli-emphasis">
				Contact page
			</Link>
			<Link to="/profile" className="text-greeli-emphasis">
				Profile page
			</Link>
			<Link to="/chat" className="text-greeli-emphasis">
				Chat page
			</Link>
			<Link to="/forum" className="text-greeli-emphasis">
				Forum page
			</Link>
			<Link to="/sitemap" className="text-greeli-emphasis">
				Sitemap
			</Link>
		</section>
	);
};

export default Sitemap;
