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

import MenuBar from "../../../../../components/Forum/EditTextEditor/MenuBar";
import { EditContext } from "../../../../../context/EditContext";
import ReplyBottomBar from "./ReplyBottomBar";
import CreateCommentBottomBar from "../CreateCommentEditor/CreateCommentBottomBar";
import CreateCommentMenuBar from "../CreateCommentEditor/CreateCommentMenuBar";
import ReplyMenuBar from "./ReplyMenuBar";
//Utilities in tiptap
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
export default function ReplyEditor({ parentId }) {
  const placeholder = "Reply ...";
  const commentParentId = parentId;

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
  const editContext = useContext(EditContext);
  return (
    <>
    <div className={"text-editor text-greeli-emphasis show-border mt-2"}>
      <EditorProvider
        editorProps={{
          attributes: {
            class: "cursor-text",
          },
        }}
        slotBefore={<ReplyMenuBar />}
        slotAfter={<ReplyBottomBar parentId={commentParentId} />}
        extensions={extensions}
        content=""
      ></EditorProvider>
    </div>
  <div
        id={`create-reply-section-error-${parentId}`}
        className="text-danger w-100 text-end fw-bold d-none"
      >
        You need to add content to create new reply 
      </div>
    </>
  );
}
