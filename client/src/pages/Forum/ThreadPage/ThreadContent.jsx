import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import DropDown from "../../../components/Forum/DropDown";
import EditTextEditor from "../../../components/Forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/Forum/ImageOrVideo";
import { PopupContext } from "../../../context/PopupContext";
import NewPostPopUp from "./components/NewPostPopUp";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";

import { useLogin } from "../../../hooks/useLogin";

axios.defaults.withCredentials = true;

export default function ThreadContent({ ...prop }) {
	const { title, uploadFile, content, objectId, createdBy } = prop;

	const popupContext = useContext(PopupContext);

	const [isOpen, setIsOpen] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const isLogin = useLogin();

	const navigate = useNavigate();

	useEffect(() => {
		checkFollowingStatus().then((res) => {
			setIsFollowed(res);
		});
	}, []);

	async function checkFollowingStatus() {
		if (JSON.parse(localStorage.getItem("user"))) {
			const path = `http://localhost:3001/api/user/${
				JSON.parse(localStorage.getItem("user")).id
			}/follow_threads`;
			const followThreads = await axios
				.get(path, {
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				})
				.then((res) => res.data);
			return followThreads.some((object) => {
				return object._id === objectId;
			});
		}
		return false;
	}

	async function handleFollowThread() {
		try {
			const path = `http://localhost:3001/api/user/${
				JSON.parse(localStorage.getItem("user")).id
			}/follow_threads`;
			await axios.post(
				path,
				{
					threadId: objectId,
				},
				{
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			);
			setIsFollowed(true);
		} catch (e) {
			console.error(e.message.data);
		}
	}

	async function handleUnFollowThread() {
		try {
			const path = `http://localhost:3001/api/user/${
				JSON.parse(localStorage.getItem("user")).id
			}/follow_threads`;
			await axios.delete(
				path,

				{
					data: {
						threadId: objectId,
					},
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			);
			setIsFollowed(false);
		} catch (e) {
			console.error(e.message);
		}
	}

	return (
		<>
			<section className="w-100 position-relative text-general-emphasis">
				<EditContextProvider>
					{/*---------TITLE, FOLLOW BUTTON AND DROPDOWN----------------------------------------------------------------------*/}
					<div
						className="d-flex align-items-start"
						style={{ width: "85%" }}
					>
						<h1 tabIndex="0" className="title fs-4">
							{title}
						</h1>

						<Button
							onClick={
								isFollowed
									? handleUnFollowThread
									: handleFollowThread
							}
							className=" ms-3 btn-primary-green-600 text-white rounded-4"
							style={{ width: "120px" }}
						>
							{isFollowed ? "followed" : "follow thread"}
						</Button>
					</div>

					<AuthorizationContextProvider
						componentType="thread"
						objectId={objectId}
					>
						<DropDown componentType="thread" />
					</AuthorizationContextProvider>
					{/*-------------------------------------------------------------------------------------------------------------*/}

					{/*---------Display image or video if have and content----------------------------------------------------------*/}
					{uploadFile ? (
						<div
							className="w-100 mt-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
							style={{ height: "400px" }}
						>
							<ImageOrVideo
								alt={title}
								src={uploadFile}
								isPost={false}
							/>
						</div>
					) : null}

					<div className="w-100 mt-3">
						<EditTextEditor
							componentType="thread"
							content={JSON.parse(content)}
						/>
					</div>
				</EditContextProvider>
				{/*-------------------------------------------------------------------------------------------------------------*/}

				{/*-----------Create Post Button--------------------------------------------------------------------------------*/}
				<Button
					onClick={() => {
						if (isLogin) {
							setIsOpen(true);
						} else {
							popupContext.setIsPopup(true);
						}
					}}
					className="w-100 bg-transparent border border-primary-green text-greeli-emphasis rounded-5 text-start"
				>
					Create Post +
				</Button>

				<NewPostPopUp
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					belongToThread={objectId}
				/>
			</section>
		</>
	);
}