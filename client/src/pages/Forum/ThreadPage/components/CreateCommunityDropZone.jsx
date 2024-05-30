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
	borderColor: "black",
	borderStyle: "solid",
	backgroundColor: "transparent",
	color: "black",
	outline: "none",
	transition: "border .24s ease-in-out",
	height: "20%",
};

const focusedStyle = {
	borderColor: "#33FF00",
	borderWidth: "3px",
};

const acceptStyle = {
	borderColor: "#DBB968",
	borderWidth: "3px",
	color: "#DBB968",
};

const rejectStyle = {
	borderWidth: "3px",
	borderColor: "red",
	color: "red",
};
export default function CreateCommunityDropZone({ file, setFile, isReset }) {
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
			"image/webp": [],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 5,
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
	let _URL = window.URL || window.webkitURL;

	let url;
	if (acceptedFiles.length > 0) {
		url = _URL.createObjectURL(acceptedFiles[0]);
	}

	return (
		<>
			<div
				tabIndex="0"
				className="w-100 h-100 rounded-circle overflow-hidden position-relative "
				{...getRootProps({ style })}
			>
				{acceptedFiles.length === 0 && <div>Upload</div>}
				<img
					className="w-100 h-100 position-absolute"
					style={{ top: "0", left: "0" }}
					src={url}
				/>
			</div>
		</>
	);
}
