import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useProfileContext } from "../../../context/ProfileContext";
import { useUserContext } from "../../../context/UserContext";

const ChangeAvatar = (props) => {
	const data = useProfileContext();
	const { userId } = data;
	console.log(userId);
	const { close } = props;
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	//UPLOAD PROFILE IMAGE
	const [file, setFile] = useState();
	const { user, error, setError, setSuccess } = useUserContext();
	const [src, setSrc] = useState(null);
	const [preview, setPreview] = useState("");
	// const { isDarkMode } = useContext(ThemeContext);
	const isMe = props.isMe;
	const formData = new FormData();
	const upload = () => {
		formData.append("image", preview);
		const configuration = {
			method: "post",
			url: baseUrl + `/api/user/${userId}/uploadImage`,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		};
		axios(configuration)
			.then((result) => {
				setSuccess("Successfully Uploaded!");
				toast.success("Successfully Uploaded!", {
					duration: 3000,
					position: "top-center",
				});
				console.log(result.data);
			})
			.catch((error) => {
				// toast.error(error.response.data.error, {
				// 	duration: 3000,
				// 	position: "top-center",
				// });
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		upload();
		close();
	};

	return (
		<div className="modal-content bg-transparent">
			<h2 id="exampleModalLabel">Change Profile Image</h2>
			<div className="text-center">
				<form onSubmit={handleSubmit}>
					<div
						className="p-0 m-0 editing-input-wrapper"
						// style={{ height: "320px" }}
					>
						{preview && (
							<img
								src={URL.createObjectURL(preview)}
								alt="Uploaded Avatar"
								width="200px"
								className="mb-3"
							/>
						)}
						<div className="d-flex flex-row justify-content-between">
							<label>Choose a profile photo</label>
							<input
								type="file"
								name="image"
								onChange={(e) => {
									setFile(e.target.files[0]);
									setPreview(e.target.files[0]);
								}}
							/>
						</div>
					</div>
					<div className="row d-flex flex-row justify-content-between g-1 mt-3">
						<button
							// type="submit"
							className="btn btn-primary col-4 mx-3 p-2 bg-danger text-white rounded-pill border-0 theme-button"
							onClick={() => {
								close();
								props.setEditTab("Profile");
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary col-4 mx-3 p-2 bg-primary-green-400 text-white rounded-pill border-0 theme-button"
						>
							Save Avatar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangeAvatar;
