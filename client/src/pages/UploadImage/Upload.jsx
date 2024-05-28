import axios from "axios";
import React, { useState } from "react";
const Upload = () => {
	const [file, setFile] = useState();
	const formData = new FormData();
	const upload = () => {
		formData.append("image", file);
		const configuration = {
			method: "post",
			url: "/api/upload",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		upload();
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					name="image"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<button type="submit">Upload</button>
			</form>
		</div>
	);
};

export default Upload;
