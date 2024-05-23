import React, { useContext } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext, useUserContext } from "../../context/UserContext";
import LeftSideBar from "../Forum/LeftSideBar/LeftSideBar";

import "../../scss/custom.css";
import "./custom.css";
import toast, { Toaster } from "react-hot-toast";
axios.defaults.withCredentials = true;

const Navbar = ({ isForum }) => {
	const navigate = useNavigate();
	const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
	const { user, setUser, toggleUserInfo } = useUserContext();
	const userId = JSON.parse(user)?.id || null;
	const logout = () => {
		// toggleUserInfo()
		const configuration = {
			method: "post",
			url: "http://localhost:3001/api/user/logout",
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				toast.success("Successfully Logout!", {
					duration: 2000,
					position: "top-center",
				});
				localStorage.removeItem("user");
				setUser(null);
				navigate("/", { replace: true });
			})
			.catch((error) => {
				toast.error(error.response.data.error, {
					duration: 3000,
					position: "top-center",
				});
				console.log(error.response.data.error);
			});
	};
	return (
		<nav
			className="navbar navbar-expand-xl fixed-top bg-navbar-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<Toaster />
			<div className="container-fluid">
				<div className="d-flex gap-4">
					{isForum && (
						<button
							className=" navbar-toggler forum-toggle"
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
					)}
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
				</div>
				<div
					className="offcanvas offcanvas-end"
					tabIndex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div
						className="offcanvas-header"
						style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)" }}
					>
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
									activeclassname="active"
									className="nav-link text-greeli-emphasis"
									aria-current="page"
									to="/"
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeclassname="active"
									className="nav-link text-greeli-emphasis"
									aria-current="page"
									to="/general"
								>
									General
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeclassname="active"
									className="nav-link text-greeli-emphasis"
									to="/forum"
								>
									Forum
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeclassname="active"
									className="nav-link text-greeli-emphasis"
									to="/about"
								>
									About
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									activeclassname="active"
									className="nav-link text-greeli-emphasis"
									to="/contact"
								>
									Contact
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				{isForum && (
					<div
						className="bg-navbar-subtle offcanvas offcanvas-start offCanvasForum "
						tabIndex="-1"
						id="offcanvasForum"
						aria-labelledby="offcanvasForumLabel"
					>
						<div className="offcanvas-header border-bottom border-white bg-greeli-subtle" >
							<h5
								className="offcanvas-title text-greeli-emphasis"
								id="offcanvasNavbarLabel"
							></h5>
							<button
								type="button"
								className="btn-close "
								data-bs-dismiss="offcanvas"
								aria-label="Close"
							/>
						</div>
						<div className="offcanvas-body h-100 bg-greeli-subtle">
							<LeftSideBar/>
						</div>
					</div>
				)}

				<div className="d-flex flex-row align-items-center gap-3">
					<NavLink
						className=""
						to="/profile"
						role="user profile page"
						aria-label="link to user profile page"
					>
						<FaUser
							className="icon text-greeli-emphasis"
							alt="user icon"
						/>
					</NavLink>
					<input
						type="checkbox"
						id="darkmode-toggle"
						checked={isDarkMode}
						onChange={toggleDarkMode}
						role="checkbox"
					/>
					<label
						htmlFor="darkmode-toggle"
						className="darkmode-toggle"
						aria-label="toggle dark mode button"
						tabIndex={0}
					>
						<IoSunny className="sun" />
						<IoMoon className="moon" />
					</label>
					{userId === null ? (
						<Link
							to="/login"
							className="login-button theme-button"
							style={{ textDecoration: "none" }}
						>
							Login
						</Link>
					) : (
						user !== null && (
							<button
								className="login-button theme-button"
								onClick={logout}
								type="button"
							>
								Logout
							</button>
						)
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
