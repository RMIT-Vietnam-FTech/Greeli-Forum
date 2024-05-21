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

import MenuBar from "../../../../../components/forum/EditTextEditor/MenuBar";
import { EditContext } from "../../../../../context/EditContext";
import CreateCommentBottomBar from "./CreateCommentBottomBar";
import { PopupContext } from "../../../../../context/PopupContext";
import { useLogin } from "../../../../../components/Popup/LoginPopup";

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
  function handleDisplay() {
    if (isLogin) {
      if (!editContext.isEdit) {
        editContext.setIsEdit(true);
      }
    }else{
		popupContext.setIsPopup(true);
	}
  }
  return (
    <div
      onClick={handleDisplay}
      className={"text-editor text-greeli-emphasis show-border"}
    >
      <EditorProvider
        editorProps={{
          attributes: {
            class: "cursor-text",
          },
        }}
        slotBefore={editContext.isEdit ? <MenuBar className="" /> : null}
        slotAfter={editContext.isEdit ? <CreateCommentBottomBar /> : null}
        extensions={extensions}
        editable={editContext.isEdit}
        content=""
      ></EditorProvider>
    </div>
  );
}
