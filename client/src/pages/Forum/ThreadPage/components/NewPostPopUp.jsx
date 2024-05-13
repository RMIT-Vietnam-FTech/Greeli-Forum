import axios, { formToJSON } from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactDom from "react-dom";
import { IoMdClose } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";
import DropZoneFile from "./DropZoneFile";
import PopupEditor from "./PopupEditor/PopupEditor";
export default function NewPostPopUp({ isOpen, setIsOpen, parentThread }) {
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	async function handleData() {
		try {
			//clear text, clear file, clear input
			const postTitleInput = document.querySelector(".post-title");
			if (
				postTitleInput.value.length >= 5 &&
				postTitleInput.value.length <= 20
			) {
				const formData = new FormData();
				formData.append("title", postTitleInput.value);
				formData.append("uploadFile", file[0]);
				formData.append("content", description);
				formData.append("parentThread", parentThread);
				await axios.post(
					"http://localhost:3001/api/v1/posts",
					formData,
					{
						headers: {
							Authorization: `Bearer ${
								JSON.parse(localStorage.getItem("user")).token
							}`,
						},
					},
				);
				setFile(null);
				setIsOpen(false);
			}
		} catch (e) {
			console.error(e.response.data);
		}
	}
	if (!isOpen) return null;
	return ReactDom.createPortal(
		<div className="modal-wrapper">
			<div
				id="post-modal"
				className="bg-primary-green-900 position-relative p-3 d-flex flex-column align-items-end "
			>
				<div className="w-100 d-flex justify-content-between">
					<h2 className="text-white">Create Post</h2>
					<button
						className="bg-transparent border-0 text-white"
						onClick={() => {
							setIsOpen(false);
						}}
					>
						<RiCloseLargeLine />
					</button>
				</div>
				<DropZoneFile setFile={setFile} file={file} isReset={!isOpen} />
				<div className="w-100 position-relative d-flex mt-3">
					<label className="text-white d-flex align-items-center me-1">
						<h4>
							Title<span className="text-danger">*</span>
						</h4>
					</label>

					<input
						className="post-title w-100 rounded-3 bg-transparent  py-2 text-white border-solid border border-white shadow-none"
						type="text"
						name="title"
						minLength={5}
						maxLength={20}
						onChange={(e) => {
							// toggle text class
							if (
								e.target.value.length < 5 ||
								e.target.value.length > 20
							) {
								const titleWarning =
									document.querySelector(".title-warning");
								titleWarning.classList.remove("d-none");
								console.log("title warning is true");
							} else {
								const titleWarning =
									document.querySelector(".title-warning");
								titleWarning.classList.add("d-none");
							}
						}}
					/>
				</div>
				<p className="title-warning text-danger">
					atleast 5 and maximum 20 character
				</p>
				<PopupEditor
					componentType="post"
					setDescription={setDescription}
					isReset={!isOpen}
				/>
				<Button onClick={handleData} className="mt-3 py-2">
					Submit
				</Button>
			</div>
		</div>,
		document.querySelector("body"),
	);
}
