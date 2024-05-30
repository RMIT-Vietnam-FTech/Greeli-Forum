import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import DropDown from "../../../components/Forum/DropDown";
import EditTextEditor from "../../../components/Forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/Forum/ImageOrVideo";
import { PopupContext } from "../../../context/PopupContext";
import NewCommunityPopUp from "./components/NewCommunityPopup";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";

import { useLogin } from "../../../hooks/useLogin";
import NewThreadPopUp from "./components/NewThreadPopUp";

axios.defaults.withCredentials = true;

export default function ThreadContent({ ...prop }) {
	const { title, uploadFile, content, objectId, createdBy } = prop;

	const popupContext = useContext(PopupContext);

	const [isOpen, setIsOpen] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const isLogin = useLogin();

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
						// Authorization: `Bearer ${
						// 	JSON.parse(localStorage.getItem("user")).token
						// }`,
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
						// Authorization: `Bearer ${
						// 	JSON.parse(localStorage.getItem("user")).token
						// }`,
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
						// Authorization: `Bearer ${
						// 	JSON.parse(localStorage.getItem("user")).token
						// }`,
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

					<AuthorizationContextProvider
						componentType="thread"
						objectId={objectId}
					>
						<DropDown componentType="thread" />
					</AuthorizationContextProvider>
					{/*-------------------------------------------------------------------------------------------------------------*/}

					{/*---------Display image or video if have and content----------------------------------------------------------*/}
					<div className="d-flex gap-3">
						<div
							className="  bg-primary-green-600 rounded-circle rounded-3 d-flex justify-content-center overflow-hidden"
							style={{
								height: "400px",
								width: "150px",
								height: "150px",
							}}
						>
							{uploadFile ? (
								<ImageOrVideo
									alt={title}
									uploadFile={uploadFile}
									h100={true}
									w100={true}
								/>
							) : null}
						</div>

						<div
							className="d-flex flex-column justify-content-start align-items-start gap-2"
							style={{ width: "85%" }}
						>
							<button
								onClick={
									isFollowed
										? handleUnFollowThread
										: handleFollowThread
								}
								className=" border-0 py-1 px-1 bg-login-subtle text-greeli-reverse-emphasis"
								style={{ width: "150px", borderRadius: "20px" }}
							>
								{isFollowed ? "joined" : "join community"}
							</button>

							<h1
								tabIndex="0"
								className="title text-greeli-emphasis fs-4"
							>
								{title}
							</h1>

							<div
								style={{ maxHeight: "300px" }}
								className="w-100 mt-2 overflow-scroll-y scrollbar-thumb-show "
							>
								<EditTextEditor
									componentType="thread"
									content={JSON.parse(content)}
								/>
							</div>
						</div>
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
					className="w-100 mt-3 bg-transparent border border-primary-green text-greeli-emphasis rounded-5 text-start"
				>
					New Thread +
				</Button>

				<NewThreadPopUp
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					belongToThread={objectId}
				/>
			</section>
		</>
	);
}
