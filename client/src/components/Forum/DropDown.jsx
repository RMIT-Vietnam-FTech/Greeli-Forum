import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { EditContext } from "../../context/EditContext";
import { useLogin } from "../../hooks/useLogin";
axios.defaults.withCredentials = true;

export default function DropDown({ componentType, data, threadId, postId }) {
	const navigate = useNavigate();
	const editContext = useContext(EditContext);
	const authorizationContext = useContext(AuthorizationContext);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	const [isArchived, setIsArchived] = useState(
		data && data.archived.isArchived,
	);
	const [isSaved, setIsSaved] = useState(false);
	useEffect(() => {
		checkSavingStatus().then((res) => res);
	}, []);
	async function checkSavingStatus() {
		if (
			JSON.parse(localStorage.getItem("user")) &&
			componentType === "post"
		) {
			const path =
				baseUrl +
				`/api/user/${
					JSON.parse(localStorage.getItem("user")).id
				}/saved_posts`;
			const archivedPosts = await axios.get(path).then((res) => res.data);
			archivedPosts.map((object) => {
				if (object._id == postId) {
					setIsSaved(true);
				}
			});
		}
	}

	function handleEdit() {
		editContext.setIsEdit(true);
	}

	async function handleSave() {
		try {
			const path =
				baseUrl +
				`/api/user/${
					JSON.parse(localStorage.getItem("user")).id
				}/saved_posts`;
			await axios.post(
				path,
				{
					postId: postId,
				},
				{
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				},
			);
			setIsSaved(true);
		} catch (e) {
			console.error(e.message.data);
		}
	}

	async function handleUnSave() {
		try {
			const path =
				baseUrl +
				`/api/user/${
					JSON.parse(localStorage.getItem("user")).id
				}/saved_posts`;
			await axios.delete(
				path,

				{
					data: {
						postId: postId,
					},
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				},
			);
			setIsSaved(false);
		} catch (e) {
			console.error(e.message.data);
		}
	}

	async function handleArchive() {
		try {
			//archived and redirect
			const path =
				baseUrl + `/api/v1/${componentType}s/${data._id}/archive`;
			await axios.post(path, {
				headers: {
					// Authorization: `Bearer ${
					//   JSON.parse(localStorage.getItem("user")).token
					// }`,
				},
			});
			setIsArchived(true);
			if (componentType == "comment") {
				window.location.reload();
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	async function handleUnArchive() {
		try {
			if (componentType === "comment") {
				//archived and redirect
				const path =
					baseUrl + `/api/v1/${componentType}s/${data._id}/unarchive`;
				await axios.put(path, {
					headers: {
						// Authorization: `Bearer ${
						//   JSON.parse(localStorage.getItem("user")).token
						// }`,
					},
				});
				setIsArchived(false);
				window.location.reload();
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	async function handleDelete() {
		try {
			const path = baseUrl + `/api/v1/${componentType}s/${data._id}`;
			await axios.delete(path, {
				headers: {
					// Authorization: `Bearer ${
					//   JSON.parse(localStorage.getItem("user")).token
					// }`,
				},
			});
			navigate(`/forum/communities/${data.belongToThread}`);
		} catch (error) {
			console.error(error.message);
		}
	}

	if (
		JSON.parse(localStorage.getItem("user")) &&
		(componentType === "post" ||
			componentType === "comment" ||
			(componentType === "thread" &&
				authorizationContext.isAuthor.current))
	) {
		return (
			<div className="dropdown position-absolute">
				<button
					className={
						"btn btn-secondary d-flex gap-1 bg-transparent border-0 "
					}
					data-bs-toggle="dropdown"
				>
					<div className={"dropdown-circle bg-login-subtle"} />
					<div className={"dropdown-circle bg-login-subtle"} />
					<div className={"dropdown-circle bg-login-subtle"} />
				</button>

				<ul className="dropdown-menu bg-navbar-subtle">
					{componentType !== "comment" &&
						authorizationContext.isAuthor.current && (
							<li>
								<a
									onClick={handleEdit}
									className={"dropdown-item"}
									href="#"
								>
									Edit
								</a>
							</li>
						)}
					{componentType == "post" && (
						<>
							<li>
								<a
									className="dropdown-item"
									onClick={
										isSaved ? handleUnSave : handleSave
									}
									href="#"
								>
									{isSaved ? "Unsaved" : "Save"}
								</a>
							</li>
							{authorizationContext.isAuthor.current && (
								<li>
									<a
										className="dropdown-item"
										onClick={handleDelete}
										href="#"
									>
										Delete
									</a>
								</li>
							)}
						</>
					)}
					<li>
						{(componentType === "post" ||
							componentType === "comment") &&
							JSON.parse(localStorage.getItem("user"))?.role ===
								"admin" && (
								<Link
									to={
										!isArchived && componentType === "post"
											? ".."
											: ""
									}
									onClick={
										isArchived
											? handleUnArchive
											: handleArchive
									}
									className="dropdown-item"
								>
									{isArchived ? "Unarchive" : "Archive"}
								</Link>
							)}
					</li>
				</ul>
			</div>
		);
	}
	return <></>;
}
