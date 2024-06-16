import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import LoginPopup from "../Popup/LoginPopup";
import PreventionPopup from "../Popup/PreventionPopup";
axios.defaults.withCredentials = true;

const RequireActivate = () => {
	const { user } = useUserContext();
	const userData = JSON.parse(localStorage.getItem("user"));
	const userActivated = JSON.parse(user)?.isActivated || null;
	const userId = JSON.parse(user)?.id || null;
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	// console.log(userActivated);
	const [comments, setComments] = useState([]);
	const [posts, setPosts] = useState([]);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	});

	const handleUnarchivedPost = async (id) => {
		// console.log(itemType);
		try {
			const configuration = {
				method: "put",
				url: baseUrl + `/api/v1/posts/${id}/unarchive`,
				headers: {
					"Content-Type": "application/json",
				},
			};
			await axios(configuration);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnarchivedComment = async (id) => {
		// console.log(itemType);
		try {
			const configuration = {
				method: "put",
				url: baseUrl + `/api/v1/comments/${id}/unarchive`,
				headers: {
					"Content-Type": "application/json",
				},
			};
			await axios(configuration);
		} catch (error) {
			console.log(error);
		}
	};

	//FETCH COMMENTS
	useEffect(() => {
		const configuration = {
			method: "get",
			url: baseUrl + `/api/v1/comments?userId=${userId}`,
		};
		axios(configuration)
			.then((result) => {
				// console.log(result.data);
				setComments(result.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userId]);

	// ----------------------------

	//FETCH POSTS
	useEffect(() => {
		const configuration = {
			method: "get",
			url: baseUrl + `/api/user/${userId}`,
		};
		axios(configuration)
			.then((result) => {
				// console.log(result.data);
				setPosts(result.data.user.createdPost);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [userId]);

	// console.log(posts, comments);

	const activateAccount = () => {
		const configuration = {
			method: "post",
			url: baseUrl + `/api/user/${userId}/activate`,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				// navigate(<Outlet />, { replace: true });
				userData.isActivated = true;
				localStorage.setItem("user", JSON.stringify(userData));
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("Account activated");

		//UNARCHIVE POSTS AND COMMENTS
		posts.forEach((postId) => {
			handleUnarchivedPost(postId);
		});

		comments.forEach((comment) => {
			handleUnarchivedComment(comment._id);
		});
	};

	return userActivated ? (
		<Outlet />
	) : (
		// <Navigate to="/login" state={{ from: location }} replace />
		<div
			className="d-flex justify-content-center align-items-center text-center"
			style={{ height: "90vh" }}
		>
			<div>
				<h2
					className=""
					style={{ marginBottom: "-40px", marginTop: "100px" }}
				>
					Your account is deactivated, click the button to activate it
				</h2>
				<PreventionPopup
					modalTitle="Reactivate your account to continue"
					buttonValue="Activate"
					action="Activate"
					buttonStyle="bg-success text-white rounded-pill mt-5 py-2 px-4 fw-bolder border-0"
					ariaLabel="Deactivate account"
					actionFunction={activateAccount}
				/>
			</div>
		</div>
	);
};
export default RequireActivate;
