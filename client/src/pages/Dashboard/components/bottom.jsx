import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const Bottom = ({ currentPage, totalPages, onPageChange }) => {
	const generatePageNumbers = () => {
		const pages = [];
		const totalDisplayedPages = 3;

		// if (totalPages <= totalDisplayedPages) return pages;

		// 3 page dau
		for (let i = 1; i <= Math.min(totalDisplayedPages, totalPages); i++) {
			pages.push(i);
		}

		// add page xunh quanh page click
		if (currentPage > totalDisplayedPages + 1) {
			pages.push("...");
		}

		const start = Math.max(currentPage - 1, totalDisplayedPages + 1);
		const end = Math.min(currentPage + 1, totalPages - totalDisplayedPages);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (currentPage < totalPages - totalDisplayedPages) {
			pages.push("...");
		}

		// Add 3 page cuoi
		for (
			let i = Math.max(
				totalPages - totalDisplayedPages + 1,
				totalDisplayedPages + 1
			);
			i <= totalPages;
			i++
		) {
			pages.push(i);
		}

		return pages;
	};

	const pages = generatePageNumbers();
	console.log(pages);

	const { isDarkMode } = useContext(ThemeContext);

	return (
		<div
			className="bottom-container"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="pagination">
				<button
					className={`${
						isDarkMode ? "dashboard-arrow-dark" : "dashboard-arrow-light"
					}`}
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					&lt;
				</button>
				{pages.map((page, index) => (
					<button
						key={index}
						className={`${
							isDarkMode ? "pagination-button-dark" : "pagination-button-light"
						} ${currentPage === page ? "active" : ""}`}
						onClick={() => onPageChange(page)}
						disabled={page === "..."}
					>
						{page}
					</button>
				))}
				<button
					className={`${
						isDarkMode ? "dashboard-arrow-dark" : "dashboard-arrow-light"
					}`}
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					&gt;
				</button>
			</div>
		</div>
	);
};

export default Bottom;
