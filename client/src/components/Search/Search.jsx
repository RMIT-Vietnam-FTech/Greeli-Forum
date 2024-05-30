import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBar.css";
import EditTextEditor from "../Forum/EditTextEditor/EditTextEditor";
import Avatar from "../Forum/Avatar";
import ImageOrVideo from "../Forum/ImageOrVideo";
import { IoDocumentTextOutline } from "react-icons/io5";
import { EditContext, EditContextProvider } from "../../context/EditContext";
export default function SearchBar() {
	const [result, setResult] = useState([]);
	async function handleOnInput(e) {
		const searchOutput = document.querySelector(".search-output");
		const searchNotFound = document.querySelector(".search-not-found");
		if (
			e.target.value.length > 0 &&
			e.target.value.replace(/ /g, "").length > 0
		) {
			searchOutput.classList.remove("d-none");
			let searchTerm = await axios
				.get(
					`http://localhost:3001/api/v1/posts?search=${e.target.value}`,
				)
				.then((res) => res.data);
			setResult([...searchTerm]);
			console.log(result);
			if (result.length === 0) {
				searchNotFound.classList.remove("d-none");
			} else {
				searchNotFound.classList.add("d-none");
			}
		} else {
			searchOutput.classList.add("d-none");
		}
	}
	return (
		<section className="z-3 sticky-top" style={{ top: "80px" }}>
			<div className="search-wrapper bg-greeli-subtle mb-4 position-relative d-flex align-items-center justify-content-between w-100 rounded-pill border border-3 ">
				<input
					className="search-input w-100 my-1 mx-2 ps-2 border-0 bg-transparent"
					type="text"
					placeholder="Search here..."
					onChange={handleOnInput}
				/>
				<FaSearch
					size="35"
					className="btn btn-lg bg-primary-green text-light rounded-circle m-1 p-1 float-end"
				/>

				<div
					className="search-output py-2 overflow-scroll-y scrollbar-thumb-show w-100 position-absolute shadow-lg bg-navbar-subtle z-3  d-none d-flex flex-column gap-3 align-items-center"
					style={{
						height: "300px",
						borderRadius: "0.75rem",
						top: "60px",
						left: "0px",
					}}
				>
					{result.map((searchData) => {
						if (result.length < 1 || searchData.archived.isArchived || searchData.isDeleted) {
							return null;
						} else {
							return (
								<SearchItem
									key={searchData._id}
									searchData={searchData}
								/>
							);
						}
					})}

					<h3 className="search-not-found text-secondary fw-normal d-none">
						{" "}
						No result was found
					</h3>
				</div>
			</div>
		</section>
	);
}

export function SearchItem({ searchData, searchBar }) {
	return (
		<Link
			onClick={() => {
				const searchBar = document.querySelector(".search-input");
				const searchOutput = document.querySelector(".search-output");
				searchOutput.classList.add("d-none");
				searchBar.value = "";
			}}
			className=" py-4 border-bottom border-primary-green-900"
			style={{ width: "95%" }}
			to={`/forum/communities/${searchData.belongToThread}/posts/${searchData._id}`}
		>
			<div className="d-flex justify-content-between gap-2">
				{/*-----------left sidebar --------------*/}
				<div className="overflow-hidden" style={{ width: "85%" }}>
					{/*-----------user info --------------*/}
					<div className="d-flex gap-2">
						<Avatar
							size="sm"
							src={searchData.createdBy.profileImage}
						/>
						<p
							className="text-secondary"
							style={{ fontSize: "12px" }}
						>
							{searchData.createdBy.username}
						</p>
					</div>
					{/*-----------title and content--------------*/}
					<div className="w-75">
						<h2
							className="text-greeli-emphasis"
							style={{ fontSize: "18px" }}
						>
							{searchData.title}
						</h2>
						<EditContextProvider>
							<EditTextEditor
								className="post-content"
								componentType="search"
								isOverFlow={true}
								content={JSON.parse(searchData.content)}
							/>
						</EditContextProvider>
					</div>
				</div>

				{/*-----------right sidebar --------------*/}
				<div
					className="search-image overflow-hidden d-flex align-items-center justify-content-center text-white bg-primary-green-600"
					style={{ borderRadius: "0.75rem", width: "200px" }}
				>
					{searchData.uploadFile ? (
						<ImageOrVideo
							w100={false}
							h100={true}
							uploadFile={searchData.uploadFile}
							isPost={true}
						/>
					) : (
						<div style={{ fontSize: "80px" }}>
							<IoDocumentTextOutline />
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}
