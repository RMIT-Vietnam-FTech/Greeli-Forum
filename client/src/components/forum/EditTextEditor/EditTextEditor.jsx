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

import { EditContext } from "../../../context/EditContext";
import EditTextBar from "./EditTextBar";
import MenuBar from "./MenuBar";

//Utilities in tiptap
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
export default function EditTextEditor({ content, componentType }) {
	//edit text editor for thread and post only
	const editContext = useContext(EditContext);
	let placeholder = "";
	if (componentType == "posts") {
		placeholder = "Enter post's content ...";
	} else if (componentType === "threads") {
		placeholder = "Enter thread's content ...";
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
			className={
				editContext.isEdit
					? "text-editor text-greeli-emphasis show-border"
					: "text-editor text-greeli-emphasis"
			}
		>
			<EditorProvider
				editorProps={{
					attributes: {
						class: "cursor-text",
					},
				}}
				slotBefore={
					editContext.isEdit ? <MenuBar className="" /> : null
				}
				slotAfter={
					editContext.isEdit ? (
						<EditTextBar
							content={content}
							componentType={componentType}
						/>
					) : null
				}
				extensions={extensions}
				editable={editContext.isEdit}
				content={content}
			></EditorProvider>
		</div>
	);
}
