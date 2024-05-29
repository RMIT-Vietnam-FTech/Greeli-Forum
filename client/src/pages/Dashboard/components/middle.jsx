import React, { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import Top from "./top";
import Bottom from "./bottom";

const Middle = (props) => {
	const { isDarkMode } = useContext(ThemeContext);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const {
		memberCount,
		sortText,
		onSortChange,
		onSearchChange,
		currentPage,
		totalPages,
		onPageChange,
		renderedData,
		onLockUser,
		onUnarchive,
		headings,
		tabTitle,
		unit,
	} = props;
	console.log(renderedData);

	const processedRenderedData = (dataItem) => {
		var rowRenderedData = [];
		if (tabTitle === "User List") {
			const firstCol = dataItem.username;
			const secondCol = dataItem.email;
			const thirdCol = {
				text: dataItem.isLocked
					? "Locked"
					: dataItem.isActivated
					? "Active"
					: "Deactivated",
				style: `status ${
					dataItem.isLocked
						? "locked"
						: dataItem.isActivated
						? "active"
						: "deactivated"
				}`,
			};
			const fourthCol = {
				text: dataItem.isLocked ? "Unlock" : "Lock",
				style: dataItem.isLocked
					? "dashboard-btn-danger"
					: "dashboard-btn-warning",
			};
			rowRenderedData = [firstCol, secondCol, thirdCol, fourthCol];
		} else {
			const firstCol = dataItem.title;
			const secondCol = dataItem.createdBy.username;
			const thirdCol = {
				text: dataItem.archived.archivedBy.username,
				style: "",
			};
			const fourthCol = {
				text: "Unarchive",
				style: "dashboard-btn-danger",
			};
			rowRenderedData = [firstCol, secondCol, thirdCol, fourthCol];
		}
		console.log(rowRenderedData);
		return rowRenderedData;
	};
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleRowClick = (user) => {
		if (isMobile) {
			setSelectedUser(user);
		}
	};

	const handleCloseModal = () => {
		setSelectedUser(null);
	};

	const handleLockUnlockUser = (user, isLocked) => {
		onLockUser(user._id, isLocked);
		const action = isLocked ? "unlocked" : "locked";
		toast.success(`${user.username} has been ${action} successfully`, {
			position: "top-center",
		});
	};

	const handleUnarchive = (item, type) => {
		onUnarchive(item._id, type);
		toast.success(`${item.title} has been unarchived successfully`, {
			position: "top-center",
		});
	};

	return (
		<div
			className="dashboard-middle-container"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<Top
				memberCount={memberCount}
				sortText={sortText}
				onSortChange={onSortChange}
				onSearchChange={onSearchChange}
				tabTitle={tabTitle}
				unit={unit}
			/>
			{renderedData.length === 0 ? (
				<div className="no-user-found">No user found</div>
			) : (
				<table className="members-table">
					<thead>
						<tr>
							<th>{headings[0]}</th>
							<th>{headings[1]}</th>
							<th>{headings[2]}</th>
							<th>{headings[3]}</th>
						</tr>
					</thead>
					<tbody>
						{renderedData.map((item, index) => (
							<tr
								key={index}
								className="DashboardUserList"
								onClick={() => handleRowClick(item)}
							>
								<td>
									<Link
										to={`/${
											tabTitle === "User List"
												? "user"
												: tabTitle === "Archived Threads"
												? "thread"
												: "post"
										}/${item._id}`}
										style={{ color: "#0A2A28" }}
										onClick={(e) => e.stopPropagation()}
									>
										{processedRenderedData(item)[0]}
									</Link>
								</td>
								<td>{processedRenderedData(item)[1]}</td>
								<td>
									<span className={processedRenderedData(item)[2].style}>
										{processedRenderedData(item)[2].text}
									</span>
								</td>
								<td>
									<button
										onClick={(e) => {
											e.stopPropagation();
											if (tabTitle === "User List") {
												handleLockUnlockUser(item, item.isLocked);
											} else {
												handleUnarchive(item, unit);
												// console.log("Unarchived");
												// console.log(item.archived?.archivedBy?.isDeactivated);
											}
										}}
										disabled={item.archived?.archivedBy?.isDeactivated}
										className={processedRenderedData(item)[3].style}
									>
										{processedRenderedData(item)[3].text}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{selectedUser && (
				<div
					id="userModal"
					className="dashboard-modal"
					onClick={handleCloseModal}
					style={{ display: "flex" }}
				>
					<div
						className="dashboard-modal-content"
						onClick={(e) => e.stopPropagation()}
					>
						<span className="dashboard-close" onClick={handleCloseModal}>
							&times;
						</span>
						<h2>{selectedUser.username}</h2>
						<p>Email: {selectedUser.email}</p>
						<p>
							Status:{" "}
							{selectedUser.isLocked
								? "Locked"
								: selectedUser.isActivated
								? "Active"
								: "Deactivated"}
						</p>
						<button
							onClick={() => {
								handleLockUnlockUser(selectedUser, selectedUser.isLocked);
								handleCloseModal();
							}}
							className={
								selectedUser.isLocked ? "btn btn-danger" : "btn btn-warning"
							}
						>
							{selectedUser.isLocked ? "Unlock" : "Lock"}
						</button>
					</div>
				</div>
			)}
			<Bottom
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default Middle;
