import { EditorProvider } from "@tiptap/react";
import React, { createContext, useContext, useState } from "react";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import MenuBarLight from "../../../../../components/forum/EditTextEditor/MenuBarLight";
//Utilities in tiptap
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
export let popUpEditorContent;
export default function PopupEditor({
	componentType,
	setDescription,
	isReset,
}) {
	//edit text editor for thread and post only
	if (isReset) {
		return ({ editor }) => {
			editor.setContent = "";
		};
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
		CodeBlockLowlight.configure({
			lowlight,
			languageClassPrefix: "language-",
		}),
	];
	return (
		<div
			className={
				"mt-3 p-3 w-100 rounded-3 border border-white h-50 text-white overflow-hidden"
			}
		>
			<EditorProvider
				editorProps={{
					attributes: {
						class: "cursor-text popup-editor",
					},
				}}
				slotBefore={<MenuBarLight />}
				extensions={extensions}
				editable={true}
				content={""}
				onUpdate={({ editor }) => {
					setDescription(editor.getJSON());
				}}
			></EditorProvider>
		</div>
	);
}
