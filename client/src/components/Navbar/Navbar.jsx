import axios from "axios";
import React, { useContext, useRef, useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMoon, IoSunny } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext, useUserContext } from "../../context/UserContext";
import LeftSideBar from "../Forum/LeftSideBar/LeftSideBar";
import { useMediaQuery } from "react-responsive";
import toast, { Toaster } from "react-hot-toast";
import "../../scss/custom.css";
import "./custom.css";
axios.defaults.withCredentials = true;

const Navbar = ({ isForum }) => {
	const navigate = useNavigate();
	const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
	const { user, setUser, toggleUserInfo } = useUserContext();
	const userId = JSON.parse(user)?.id || null;
	const userRole = JSON.parse(user)?.role || null;
	const isAdmin = userRole === "admin";
	const [isMobile, setIsMobile] = useState(false);
	const closeBtnRef = useRef(null);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	useEffect(() => {
		const query = window.matchMedia("(max-width: 768px)");
		setIsMobile(query.matches);
	}, []);

	const handleNavLinkClick = () => {
		if (closeBtnRef.current) {
			closeBtnRef.current.click();
		}
	};

	const logout = () => {
		const configuration = {
			method: "post",
			url: baseUrl + "/api/user/logout",
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
				toast.error(error, {
					duration: 3000,
					position: "top-center",
				});
				console.log(error);
			});
	};

	//HANDLE DROPDOWN FOR PROFILE
	const dropdownMenuHandler = (event) => {
		const currentElementChild = event.target.firstElementChild;
		if (
			currentElementChild !== null &&
			currentElementChild.nextElementSibling !== null
		) {
			currentElementChild.nextElementSibling.classList.add("show");
			console.log(currentElementChild.nextElementSibling);
		}
	};
	return (
		<div>
			{isMobile ? (
				<nav
					className="navbar navbar-expand-xl fixed-top bg-navbar-subtle"
					data-bs-theme={isDarkMode ? "dark" : "light"}
				>
					<Toaster />
					<div className="container-fluid">
						<div className="d-flex gap-2">
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
									src={
										isDarkMode
											? "/DarkLogo.svg"
											: "/LightLogo.svg"
									}
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
								<div
									className="offcanvas-header"
									style={{
										boxShadow:
											"0 2px 4px rgba(0, 0, 0, 0.25)",
									}}
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
										ref={closeBtnRef}
									/>
								</div>
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
										<li className="nav-item">
											<NavLink
												to="/"
												className="nav-link text-greeli-emphasis"
												onClick={handleNavLinkClick}
											>
												Home
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												to="/general"
												className="nav-link text-greeli-emphasis"
												onClick={handleNavLinkClick}
											>
												General
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												to="/forum"
												className="nav-link text-greeli-emphasis"
												onClick={handleNavLinkClick}
											>
												Forum
											</NavLink>
										</li>
										{/* <li className="nav-item">
										<NavLink
											to="/about"
											className="nav-link text-greeli-emphasis"
											onClick={handleNavLinkClick}
										>
											About
										</NavLink>
									</li> */}
										<li className="nav-item">
											<NavLink
												to="/contact"
												className="nav-link text-greeli-emphasis"
												onClick={handleNavLinkClick}
											>
												Contact
											</NavLink>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{isForum && (
							<div
								className="bg-navbar-subtle offcanvas offcanvas-start offCanvasForum "
								tabIndex="-1"
								id="offcanvasForum"
								aria-labelledby="offcanvasForumLabel"
							>
								<div className="offcanvas-header border-bottom border-white bg-greeli-subtle">
									<h5
										className="offcanvas-title text-greeli-emphasis"
										id="offcanvasNavbarLabel"
									/>
									<button
										type="button"
										className="btn-close "
										data-bs-dismiss="offcanvas"
										aria-label="Close"
									/>
								</div>
								<div className="offcanvas-body h-100 bg-greeli-subtle">
									<LeftSideBar />
								</div>
							</div>
						)}

						{/* <div className="d-flex flex-row align-items-center gap-3"> */}
						<div
							className="dropdown"
							style={{ top: "0px", right: "0px" }}
						>
							<div data-bs-toggle="dropdown">
								<FaUser
									className="icon text-greeli-emphasis"
									alt="user icon"
								/>
								<IoMdArrowDropdown
									className="icon text-greeli-emphasis"
									alt="user icon"
								/>{" "}
							</div>
							<ul
								className={`dropdown-menu ${
									isDarkMode ? "bg-primary-yellow" : ""
								}`}
								style={{ right: "0px", top: "120%" }}
							>
								<li>
									<NavLink
										className="dropdown-item ps-3 text-decoration-none profile-drop"
										to="/profile"
										role="user profile page"
										aria-label="link to user profile page"
									>
										Profile
									</NavLink>
								</li>
								{isAdmin && (
									<li>
										{" "}
										<NavLink
											className="dropdown-item ps-3 text-decoration-none profile-drop"
											to={
												isAdmin
													? "/admin"
													: "/page-not-found"
											}
											role="dashboard page"
											aria-label="link to user dashboard page"
										>
											Dashboard (Admin)
										</NavLink>
									</li>
								)}
							</ul>
							{/* </div> */}
						</div>
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
								className="login-button"
								style={{ textDecoration: "none" }}
								onClick={handleNavLinkClick}
							>
								Login
							</Link>
						) : (
							user !== null && (
								<button
									className="login-button theme-button"
									onClick={() => {
										logout();
									}}
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
						{/* </div> */}
					</div>
				</nav>
			) : (
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
									src={
										isDarkMode
											? "/DarkLogo.svg"
											: "/LightLogo.svg"
									}
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
								style={{
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
								}}
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
									ref={closeBtnRef}
								/>
							</div>
							<div className="offcanvas-body">
								<ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
									<li className="nav-item">
										<NavLink
											to="/"
											className="nav-link text-greeli-emphasis"
											onClick={handleNavLinkClick}
										>
											Home
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/general"
											className="nav-link text-greeli-emphasis"
											onClick={handleNavLinkClick}
										>
											General
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/forum"
											className="nav-link text-greeli-emphasis"
											onClick={handleNavLinkClick}
										>
											Forum
										</NavLink>
									</li>
									{/* <li className="nav-item">
								<NavLink
									to="/about"
									className="nav-link text-greeli-emphasis"
									onClick={handleNavLinkClick}
								>
									About
								</NavLink>
							</li> */}
									<li className="nav-item">
										<NavLink
											to="/contact"
											className="nav-link text-greeli-emphasis"
											onClick={handleNavLinkClick}
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
								<div className="offcanvas-header border-bottom border-white bg-greeli-subtle">
									<h5
										className="offcanvas-title text-greeli-emphasis"
										id="offcanvasNavbarLabel"
									/>
									<button
										type="button"
										className="btn-close "
										data-bs-dismiss="offcanvas"
										aria-label="Close"
									/>
								</div>
								<div className="offcanvas-body h-100 bg-greeli-subtle">
									<LeftSideBar />
								</div>
							</div>
						)}

						<div className="d-flex flex-row align-items-center gap-3">
							<div
								className="dropdown"
								style={{ top: "0px", right: "0px" }}
							>
								<div data-bs-toggle="dropdown">
									<FaUser
										className="icon text-greeli-emphasis"
										alt="user icon"
									/>
									<IoMdArrowDropdown
										className="icon text-greeli-emphasis"
										alt="user icon"
									/>{" "}
								</div>
								<ul
									className={`dropdown-menu ${
										isDarkMode ? "bg-primary-yellow" : ""
									}`}
									style={{ right: "0px", top: "120%" }}
								>
									<li>
										<NavLink
											className="dropdown-item ps-3 text-decoration-none profile-drop"
											to="/profile"
											role="user profile page"
											aria-label="link to user profile page"
										>
											Profile
										</NavLink>
									</li>
									{isAdmin && (
										<li>
											{" "}
											<NavLink
												className="dropdown-item ps-3 text-decoration-none profile-drop"
												to={
													isAdmin
														? "/admin"
														: "/page-not-found"
												}
												role="dashboard page"
												aria-label="link to user dashboard page"
											>
												Dashboard (Admin)
											</NavLink>
										</li>
									)}
								</ul>
								{/* </div> */}
							</div>
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
									className="login-button"
									style={{ textDecoration: "none" }}
									onClick={handleNavLinkClick}
								>
									Login
								</Link>
							) : (
								user !== null && (
									<button
										className="login-button theme-button"
										onClick={() => {
											logout();
										}}
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
			)}
		</div>
	);
};

export default Navbar;
