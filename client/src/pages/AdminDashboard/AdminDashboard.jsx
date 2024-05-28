import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import "./AdminDashboard.css";
import Bottom from "./components/bottom";
import Middle from "./components/middle";
import Top from "./components/top";
import { useUserContext } from "../../context/UserContext";
import SignIn from "../../components/Popup/SignIn";
axios.defaults.withCredentials = true;

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const { error, setError } = useUserContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const [sortCriteria, setSortCriteria] = useState("newest");
	const [sortText, setSortText] = useState("Sort by");
	const [searchQuery, setSearchQuery] = useState("");
	const { isDarkMode } = useContext(ThemeContext);
	const usersPerPage = 5; // Lets do 5 i guess

	const apiUrl = "http://localhost:3001"; // Manh Tan change this in production nhe

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/user/getAll`, {
					params: {
						page: currentPage,
						limit: usersPerPage,
						sort: sortCriteria,
					},
				});
				setUsers(response.data.users || []);
				setTotalUsers(response.data.totalUsers || 0);
				setTotalPages(
					Math.ceil((response.data.totalUsers || 0) / usersPerPage),
				);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, [currentPage, sortCriteria, apiUrl]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSortChange = (sort, text) => {
		setSortCriteria(sort);
		setSortText(text);
	};

	const handleSearchChange = (query) => {
		setSearchQuery(query);
	};

	const handleLockUser = async (userId, isLocked) => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user.role !== "admin") {
			alert("Only admin can lock/unlock users");
			return;
		}

		const adminId = user.id;
		const action = isLocked ? "unlock" : "lock";

		try {
			const configuration = {
				method: "put",
				url: `${apiUrl}/api/user/${adminId}/${userId}/${action}`,
				headers: {
					"Content-Type": "application/json",
				},
			};
			await axios(configuration);
			setUsers(
				users.map((user) =>
					user._id === userId
						? { ...user, isLocked: !isLocked }
						: user,
				),
			);
		} catch (error) {
			alert(isLocked ? "Failed to unlock user" : "Failed to lock user");
		}
	};

	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().startsWith(searchQuery.toLowerCase()),
	);

	const navigate = useNavigate();

	if (loading) return <div>Loading...</div>;
	if (error === "expire token") return <SignIn isShow={true} />;

	return (
		<div
			className="admin-dashboard bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<Top
				memberCount={totalUsers}
				sortText={sortText}
				onSortChange={handleSortChange}
				onSearchChange={handleSearchChange}
			/>
			<Middle users={filteredUsers} onLockUser={handleLockUser} />
			<Bottom
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>

			<button
				className="AdminDashboardReturnButton"
				onClick={() => navigate(-1)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-arrow-return-left"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
					/>
				</svg>
			</button>
		</div>
	);
};

export default AdminDashboard;
