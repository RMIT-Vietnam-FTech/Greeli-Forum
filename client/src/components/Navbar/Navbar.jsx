import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import Cookies from "universal-cookie";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import "../../scss/custom.css";
import { ThemeContext } from "../../context/ThemeContext";
import "./custom.css";
import { UserContext, useUserContext } from "../../context/UserContext";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
	const cookies = new Cookies();
	const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
	const { user, setUser, toggleUserInfo } = useUserContext();
	const logout = () => {
		console.log("logout");
		// toggleUserInfo()
		localStorage.removeItem("user");
		cookies.remove("TOKEN", { path: "/" });
		setUser(null);
	};
	return (
		<nav
			className="navbar navbar-expand-md fixed-top bg-navbar-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasForum"
					aria-controls="offcanvasForum"
					aria-label="Toggle navigation"
				>
					<span className="text-greeli-emphasis">
						<FiMoreVertical />
					</span>
				</button>
				<Link className="brand d-flex" to="/">
					<Image
						className="me-0 me-md-3"
						src={isDarkMode ? "DarkLogo.svg" : "LightLogo.svg"}
						width={40}
						alt="Greeli Logo"
					/>
					<p className="forum-name my-auto text-greeli-emphasis ml-3">
						Greeli
					</p>
				</Link>
				<div
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div className="offcanvas-header border-bottom border-danger">
						<h5
							className="offcanvas-title text-greeli-emphasis"
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
								<NavLink
									activeClassname="active"
									className="nav-link text-greeli-emphasis"
									aria-current="page"
									to="/general"
								>
									General
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeClassname="active"
									className="nav-link text-greeli-emphasis"
									to="/forum"
								>
									Forum
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeClassname="active"
									className="nav-link text-greeli-emphasis"
									to="/about"
								>
									About
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeClassname="active"
									className="nav-link text-greeli-emphasis"
									to="/contact"
								>
									Contact
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				<div
					className="offcanvas offcanvas-start offCanvasForum"
					tabIndex="-1"
					id="offcanvasForum"
					aria-labelledby="offcanvasForumLabel"
				>
					<div className="offcanvas-header border-bottom border-danger">
						<h5
							className="offcanvas-title text-greeli-emphasis"
							id="offcanvasNavbarLabel"
						>
							Topic
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
									Healthy Eating
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									Exercise
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									Recycle Product
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link text-greeli-emphasis"
									href="/"
								>
									Sleeping
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="d-flex flex-row align-items-center gap-3">
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
					{!user && (
						<Link to="/login" className="login-button">
							Login
						</Link>
					)}
					{user && (
						<button className="login-button" onClick={logout}>
							Logout
						</button>
					)}
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar"
						aria-label="Toggle navigation"
					>
						<p className="text-greeli-emphasis m-0">
							<RxHamburgerMenu />
						</p>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
