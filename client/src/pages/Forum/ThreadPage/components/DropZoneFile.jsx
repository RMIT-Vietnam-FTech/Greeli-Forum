import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px",
	borderWidth: 1,
	borderRadius: "15px",
	borderColor: "white",
	borderStyle: "solid",
	backgroundColor: "transparent",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
	height: "20%",
};

const focusedStyle = {
	borderColor: "#33FF00",
};

const acceptStyle = {
	borderColor: "#6EE026",
	color: "#6EE026",
};

const rejectStyle = {
	borderColor: "red",
	color: "red",
};
export default function DropZoneFile({ file, setFile, isReset }) {
	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
		acceptedFiles,
		fileRejections,
	} = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
			"image/gif": [],
			"image/webp": [],
			"video/mp4": [],
			"video/webm": [],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 20,
		onDropAccepted: (file) => {
			setFile(file);
		},
		onDropRejected: () => {
			setFile(null);
			acceptedFiles.length = 0;
		},
	});
	if (isReset) {
		acceptedFiles.length = 0;
		fileRejections.length = 0;
	}
	const acceptedFileItem = acceptedFiles.map((file) => (
		<span key={file.path}>
			{file.path} - {file.size} bytes
		</span>
	));
	const style = useMemo(
		() => ({
			...baseStyle,
			...(acceptedFiles.length > 0 ? acceptStyle : {}),
			...(fileRejections.length > 0 ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject],
	);

	return (
		<>
			<div className="w-100" {...getRootProps({ style })}>
				<input {...getInputProps()} name="uploadFile" />
				{!file ? (
					<h4>Drop or Drag or click to Upload</h4>
				) : (
					<h4>Drop or Drag or Click to Replace</h4>
				)}
				{fileRejections.length > 0 ? (
					<p className="mt-2">
						{" "}
						Rejected (video or image only, maximum upload file is
						one)
					</p>
				) : null}
				{acceptedFiles.length > 0 ? (
					<p className="mt-2">Accepted: {acceptedFileItem}</p>
				) : null}
			</div>
		</>
	);
}
