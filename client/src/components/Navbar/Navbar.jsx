import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import { FaUser } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";
import "../../scss/custom.css";
import { ThemeContext } from "../../themeContext";
import "./custom.css";
const Navbar = () => {
	const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
	return (
		<nav
			className="navbar navbar-expand-md fixed-top bg-navbar-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="container-fluid">
				<a className="navbar-brand d-flex" href="/">
					<Image
						className="bi me-3"
						src={isDarkMode ? "DarkLogo.svg" : "LightLogo.svg"}
						width={40}
						alt="Greeli Logo"
					/>
					<p className="forum-name my-auto text-greeli-emphasis">
						Greeli
					</p>
				</a>
				<div
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div className="offcanvas-header border-bottom border-danger">
						<h5
							className="offcanvas-title"
							id="offcanvasNavbarLabel"
						>
							Menu
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						/>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
							<li className="nav-item">
								<a
									className="nav-link active text-greeli-emphasis"
									aria-current="page"
									href="/"
								>
									General
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									Forum
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									About
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="d-flex flex-row align-items-center gap-4">
					<a className="nav-link" href="/">
						<FaUser className="icon text-greeli-emphasis" />
					</a>
					<input
						type="checkbox"
						id="darkmode-toggle"
						checked={isDarkMode}
						onChange={toggleDarkMode}
					/>
					<label
						htmlFor="darkmode-toggle"
						className="darkmode-toggle"
					>
						<IoSunny className="sun" />
						<IoMoon className="moon" />
					</label>
					<a href="/" className="login-button">
						Login
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
