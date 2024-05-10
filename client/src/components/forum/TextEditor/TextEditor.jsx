import { EditorProvider } from "@tiptap/react";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

//icon
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
import AuthContext from "../../../contexts/AuthContext";
import EditBar from "./EditBar";
import MenuBar from "./MenuBar";

//Utilities in tiptap
import { generateHTML } from "@tiptap/html";
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
export default function TextEditor({
	content,
	toggleIsEditOnClick,
	isExpand,
	resetClickDone,
}) {
	const authContext = useContext(AuthContext);
	function handleDisplay() {
		if (!authContext.isEdit) {
			authContext.toggleIsEdit();
		}
	}
	let placeholder = "";
	if (
		authContext.componentType == "comments" ||
		authContext.componentType == "createComment"
	) {
		placeholder = "Comment ...";
	} else if (authContext.componentType == "posts") {
		placeholder = "Enter post's content ...";
	} else if (authContext.componentType === "threads") {
		placeholder = "Enter thread's content ...";
	} else if (authContext.componentType === "replies") {
		placeholder = "Reply ...";
	}
	const extensions = [
		StarterKit.configure({
			bulletList: {
				keepMarks: true,
				keepAttributes: false,
			},
			orderedList: {
				keepMarks: true,
				keepAttributes: false,
			},
		}),
		Placeholder.configure({
			placeholder: placeholder,
			showOnlyWhenEditable: false,
		}),
		CodeBlockLowlight.configure({
			lowlight,
			languageClassPrefix: "language-",
		}),
	];

	return (
		<div
			onClick={toggleIsEditOnClick ? handleDisplay : null}
			className={
				authContext.isEdit ||
				authContext.componentType == "createComment" ||
				isExpand
					? "text-editor show-border"
					: "text-editor"
			}
		>
			<EditorProvider
				editorProps={{
					attributes: {
						class: "cursor-text",
					},
				}}
				slotBefore={
					authContext.isEdit || isExpand ? (
						<MenuBar className="" />
					) : null
				}
				slotAfter={
					authContext.isEdit || isExpand ? (
						<EditBar
							content={content}
							isExpand={isExpand}
							reset={resetClickDone}
						/>
					) : null
				}
				extensions={extensions}
				editable={authContext.isEdit}
				content={content}
			></EditorProvider>
		</div>
	);
}
