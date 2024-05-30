import { EditorProvider } from "@tiptap/react";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import MenuBar from "../../../../../components/Forum/EditTextEditor/MenuBar";
import { EditContext } from "../../../../../context/EditContext";
import { PopupContext } from "../../../../../context/PopupContext";
import CreateCommentBottomBar from "./CreateCommentBottomBar";

import { useLogin } from "../../../../../hooks/useLogin";

import { extensions } from "../../../../../components/Forum/EditTextEditor/EditTextEditor";
import CreateCommentMenuBar from "./CreateCommentMenuBar";
//Utilities in tiptap
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
export default function CreateCommentEditor() {
	const editContext = useContext(EditContext);
	const popupContext = useContext(PopupContext);
	const isLogin = useLogin();

	const placeholder = "Comment ...";
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
	const editorProps = {
		attributes: {
			class: "cursor-text",
		},
	};
	function handleDisplay() {
		if (isLogin) {
			if (!editContext.isEdit) {
				editContext.setIsEdit(true);
			}
		} else {
			popupContext.setIsPopup(true);
		}
	}
	return (
		<>
			<div
				tabIndex="0"
				aria-label="create comment"
				onKeyDown={handleDisplay}
				onClick={handleDisplay}
				className={"text-editor text-greeli-emphasis show-border my-3"}
			>
				<EditorProvider
					slotBefore={
						editContext.isEdit ? <CreateCommentMenuBar /> : null
					}
					slotAfter={
						editContext.isEdit ? <CreateCommentBottomBar /> : null
					}
					extensions={[
						Placeholder.configure({
							placeholder: placeholder,
							showOnlyWhenEditable: false,
						}),
						,
						...extensions,
					]}
					editorProps={editorProps}
					editable={true}
					content=""
				></EditorProvider>
			</div>
			<div
				id="create-comment-section-error"
				className="text-danger w-100 text-end fw-bold d-none"
			>
				You need to add content to create new comment
			</div>
		</>
	);
}
