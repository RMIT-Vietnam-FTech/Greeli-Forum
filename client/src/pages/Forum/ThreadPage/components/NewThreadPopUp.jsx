import axios, { formToJSON } from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { RiCloseLargeLine } from "react-icons/ri";
import Slider from "react-slick";
import DropZoneFile from "./DropZoneFile";
import PopupEditor from "./PopupEditor/PopupEditor";
import { useNavigate } from "react-router-dom";

export default function NewThreadPopUp({ isOpen, setIsOpen }) {
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState([]);
	const [addedTopics, setAddedTopics] = useState([]);
	const [isNext, setIsNext] = useState(false);
	const navigate = useNavigate();
	const defaultTopics = [
		"Health",
		"Transportation",
		"Environment",
		"Energy",
		"Food",
		"Climate Change",
	];
	async function handleData() {
		try {
			//clear text, clear file, clear input
			const threadTitleInput = document.querySelector(".thread-title");
			if (
				threadTitleInput.value.length >= 5 &&
				threadTitleInput.value.length <= 50 &&
				addedTopics.length >= 1
			) {
				setFile(null);
				setIsNext(false);
				setIsOpen(false);
				setAddedTopics([]);
				setDescription([]);
				const formData = new FormData();
				formData.append("title", threadTitleInput.value);
				if (file) {
					formData.append("uploadFile", file[0]);
				} else {
					formData.append("uploadFile", null);
				}
				formData.append("content", JSON.stringify(description));
				for (let i = 0; i < addedTopics.length; ++i) {
					formData.append("topics[]", addedTopics[i]);
				}
				const res = await axios.post(
					"http://localhost:3001/api/v1/threads",
					formData,
					{
						headers: {
							Authorization: `Bearer ${
								JSON.parse(localStorage.getItem("user")).token
							}`,
						},
					},
				);
				navigate(`/forum/threads/${res.data}`);
			}
		} catch (e) {
			console.error(e.message);
		}
	}
	var settings = {
		dots: false,
		infinite: false,
		speed: 200,
		touchMove: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: (
			<NextArrow
				handleData={handleData}
				isNext={isNext}
				setIsNext={setIsNext}
				setIsOpen={setIsOpen}
			/>
		),
		prevArrow: <PrevArrow isNext={isNext} setIsNext={setIsNext} />,
	};
	if (!isOpen) return null;
	return ReactDom.createPortal(
		<section className="modal-wrapper">
			<section
				id="post-modal"
				className="bg-primary-green-900 position-relative p-3 d-flex flex-column align-items-end "
			>
				<Slider className="w-100" {...settings}>
					<div>
						{/* First slide */}
						<div className="w-100 d-flex justify-content-between">
							<h2 className="text-white">Create Thread</h2>
							<button
								className="bg-transparent border-0 text-white"
								onClick={() => {
									setIsNext(false);
									setIsOpen(false);
								}}
							>
								<RiCloseLargeLine />
							</button>
						</div>

						<DropZoneFile
							setFile={setFile}
							file={file}
							isReset={!isOpen}
						/>
						<div className="w-100 position-relative d-flex mt-3">
							<label className="text-white d-flex align-items-center me-1">
								<h4>
									Title<span className="text-danger">*</span>
								</h4>
							</label>

							<input
								className="thread-title w-100 rounded-3 bg-transparent  py-2 text-white border-solid border border-white shadow-none"
								type="text"
								name="title"
								minLength={5}
								maxLength={50}
								onChange={(e) => {
									// toggle text class
									if (
										e.target.value.length < 5 ||
										e.target.value.length > 50
									) {
										const titleWarning =
											document.querySelector(
												".title-warning",
											);
										titleWarning.classList.remove("d-none");
										console.log("title warning is true");
									} else {
										const titleWarning =
											document.querySelector(
												".title-warning",
											);
										titleWarning.classList.add("d-none");
									}
								}}
							/>
						</div>
						<p className="title-warning text-danger">
							atleast 5 and maximum 50 characters
						</p>

						<PopupEditor
							componentType="post"
							setDescription={setDescription}
							isReset={!isOpen}
						/>
					</div>
					{/* Second slide */}
					<div>
						<div className="w-100 d-flex justify-content-between">
							<h2 className="text-white">Add topic</h2>
							<button
								className="bg-transparent border-0 text-white"
								onClick={() => {
									setFile(null);
									setIsNext(false);
									setIsOpen(false);
									setAddedTopics([]);
									setDescription([]);
								}}
							>
								<RiCloseLargeLine />
							</button>
						</div>
						<p className="text-secondary">
							Add atleast 1 and maximum 3 topics to help people
							find your thread
						</p>
						<div
							className="border-bottom border-secondary"
							style={{ height: "100px" }}
						>
							<div className="w-100  d-flex flex-wrap gap-1 gap-col-1">
								{/*Added topics*/}
								{addedTopics.map((addedTopic) => {
									return (
										<RemovedButton
											topicName={addedTopic}
											addedTopics={addedTopics}
											setAddedTopics={setAddedTopics}
										/>
									);
								})}
							</div>
						</div>

						<div className="w-100 mt-3 d-flex gap-1 flex-wrap">
							{/*Default topics*/}
							{defaultTopics.map((defaultTopic) => {
								return (
									<AddedButton
										topicName={defaultTopic}
										addedTopics={addedTopics}
										setAddedTopics={setAddedTopics}
									/>
								);
							})}
						</div>
					</div>
				</Slider>
			</section>
		</section>,
		document.querySelector("body"),
	);
}

function AddedButton({ topicName, addedTopics, setAddedTopics }) {
	function handleAddBtn(topic) {
		setAddedTopics([...addedTopics, topic]);
	}
	function handleRemoveBtn(topic) {
		const copyTopics = [...addedTopics];
		copyTopics.splice([...copyTopics].indexOf(topic), 1);
		setAddedTopics([...copyTopics]);
	}
	return (
		<button
			className="m-1 py-1 px-2 btn border border-none text-white d-flex align-items-center  gap-2"
			style={{ borderRadius: "30px" }}
			onClick={
				addedTopics.includes(topicName)
					? () => {
							handleRemoveBtn(topicName);
						}
					: () => {
							handleAddBtn(topicName);
						}
			}
			value={topicName}
		>
			<p className="m-0">{topicName}</p>
			{addedTopics.includes(topicName) ? <p className="m-0">-</p> : null}
		</button>
	);
}

function RemovedButton({ topicName, addedTopics, setAddedTopics }) {
	function handleRemoveBtn(topic) {
		const copyTopics = [...addedTopics];
		console.log("copy topic in remove button:" + copyTopics);
		copyTopics.splice([...copyTopics].indexOf(topic), 1);
		setAddedTopics([...copyTopics]);
	}
	return (
		<button
			className="m-1 py-1 px-2 btn btn-primary-green-300 text-dark border border-none d-flex align-items-center  gap-2"
			style={{ borderRadius: "30px" }}
			onClick={() => {
				handleRemoveBtn(topicName);
			}}
			value={topicName}
		>
			<p className="m-0">{topicName}</p>
			<p className="m-0">-</p>
		</button>
	);
}
function NextArrow(props) {
	const { onClick, isNext, setIsNext, setIsOpen, handleData } = props;
	console.log("is Next: " + isNext);
	return (
		<div onClick={onClick}>
			<button
				className="m-1 py-1 px-4 btn btn-primary-yellow-600 text-primary-green-900 border-none position-absolute"
				style={{ bottom: "-100px", left: "100px" }}
				onClick={
					isNext
						? handleData
						: () => {
								setIsNext(true);
							}
				}
			>
				{isNext ? "Submit" : "Next"}
			</button>
		</div>
	);
}

function PrevArrow(props) {
	const { onClick, setIsNext } = props;
	return (
		<div onClick={onClick}>
			<button
				className="m-1 py-1 px-4 btn btn-primary-yellow-600 text-primary-green-900 text-dark  border-none position-absolute"
				style={{ bottom: "-100px", left: "0" }}
				onClick={() => {
					setIsNext(false);
				}}
			>
				Left
			</button>
		</div>
	);
}
