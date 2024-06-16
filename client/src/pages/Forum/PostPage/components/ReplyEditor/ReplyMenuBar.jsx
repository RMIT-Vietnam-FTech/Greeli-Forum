import { useCurrentEditor } from "@tiptap/react";
import { CiImageOn } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import {
	FaBold,
	FaCode,
	FaHeading,
	FaItalic,
	FaList,
	FaListOl,
	FaQuoteLeft,
	FaStrikethrough,
} from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import { ReplyContext } from "../../../../../context/ReplyContext";

export default function ReplyMenuBar() {
	const { editor } = useCurrentEditor();
	const { file, setFile } = useContext(ReplyContext);
	const [dropFile, setDropFile] = useState();
	console.log(file);
	if (!editor) {
		return null;
	}

	return (
		<>
			<div className="mb-3">
				<Bold editor={editor}>
					<FaBold />
				</Bold>
				<Italic editor={editor}>
					<FaItalic />
				</Italic>
				<Strike editor={editor}>
					<FaStrikethrough />
				</Strike>
				<Heading editor={editor}>
					<FaHeading />
				</Heading>
				<BulletList editor={editor}>
					<FaList />
				</BulletList>
				<OrderList editor={editor}>
					<FaListOl />
				</OrderList>
				<CodeBlock editor={editor}>
					<FaCode />
				</CodeBlock>
				<BlockQuote editor={editor}>
					<FaQuoteLeft />
				</BlockQuote>
				<ImageTag
					setFile={setFile}
					file={file}
					setDropFile={setDropFile}
					editor={editor}
				>
					<CiImageOn />
				</ImageTag>
				<VideoTag
					setFile={setFile}
					setDropFile={setDropFile}
					editor={editor}
				>
					<MdOndemandVideo />
				</VideoTag>
			</div>
			{dropFile && (
				<div
					style={{ width: "250px", borderRadius: "20px" }}
					className=" mx-auto position-relative overflow-hidden bg-black"
					id="create-comment-drop-file"
					onMouseEnter={() => {
						const trashBinBtn =
							document.querySelector("#trash-bin-btn");
						trashBinBtn.classList.remove("d-none");
					}}
					onMouseLeave={() => {
						console.log();
						const trashBinBtn =
							document.querySelector("#trash-bin-btn");
						trashBinBtn.classList.add("d-none");
					}}
				>
					{dropFile.type === "image" ? (
						<img className="w-100 " src={dropFile.src} />
					) : (
						<ReactPlayer
							className="w-100"
							controls
							url={dropFile.src}
						/>
					)}
					<button
						id="trash-bin-btn"
						className="bg-transparent position-absolute border-0 d-none"
						style={{ top: "0px", right: "10px", fontSize: "30px" }}
						onClick={() => {
							setDropFile(undefined);
							setFile(undefined);
						}}
					>
						<FaRegTrashAlt />
					</button>
				</div>
			)}
		</>
	);
}

function Bold({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleBold().run();
	}
	return (
		<button
			onClick={handleOnClick}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("bold") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function Italic({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleItalic().run();
	}
	return (
		<button
			onClick={handleOnClick}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("italic") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function Strike({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleStrike().run();
	}
	return (
		<button
			onClick={handleOnClick}
			disabled={!editor.can().chain().focus().toggleStrike().run()}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("strike") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function Heading({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleHeading({ level: 3 }).run();
	}
	return (
		<button
			onClick={handleOnClick}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("heading", { level: 3 }) ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function BulletList({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleBulletList().run();
	}
	return (
		<button
			onClick={handleOnClick}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("bulletList") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function OrderList({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleOrderedList().run();
	}
	return (
		<button
			onClick={handleOnClick}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("orderedList") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function CodeBlock({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleCodeBlock().run();
	}
	return (
		<button
			onClick={handleOnClick}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("codeBlock") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function BlockQuote({ editor, children }) {
	function handleOnClick() {
		editor.chain().focus().toggleBlockquote().run();
	}
	return (
		<button
			onClick={handleOnClick}
			className={
				"btn-editor bg-transparent border-0 " +
				(editor.isActive("blockQuote") ? "is-active" : "")
			}
		>
			{children}
		</button>
	);
}
function ImageTag({ editor, children, setDropFile, setFile, file }) {
	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
			"image/gif": [],
			"image/webp": [],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 10,
	});
	useEffect(() => {
		if (acceptedFiles.length > 0) {
			let _URL = window.URL || window.webkitURL;
			let url = _URL.createObjectURL(acceptedFiles[0]);
			setDropFile({
				src: url,
				type: "image",
			});
		}
		setFile(acceptedFiles[0]);
		console.log(file);
	}, [acceptedFiles]);
	return (
		<button
			style={{ fontSize: "20px" }}
			className={"btn-editor bg-transparent border-0 "}
			type="button"
			onClick={open}
		>
			{children}
		</button>
	);
}

function VideoTag({ editor, children, setDropFile, setFile }) {
	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		accept: {
			"video/mp4": [],
			"video/webm": [],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 10,
	});

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			let _URL = window.URL || window.webkitURL;
			let url = _URL.createObjectURL(acceptedFiles[0]);
			setDropFile({
				src: url,
				type: "video",
			});
		}
		setFile(acceptedFiles[0]);
	}, [acceptedFiles]);

	return (
		<button
			style={{ fontSize: "20px" }}
			className={"btn-editor bg-transparent border-0 "}
			type="button"
			onClick={open}
		>
			{children}
		</button>
	);
}
