import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { EditorProvider } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { lowlight } from "lowlight";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import AuthContext from "../../../contexts/AuthContext";
import MenuBar from "./MenuBar";
import EditBar from "./EditBar";
//icon
import {
  FaBold,
  FaStrikethrough,
  FaItalic,
  FaHeading,
  FaList,
  FaListOl,
  FaCode,
  FaQuoteLeft,
} from "react-icons/fa6";

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
  if (authContext.componentType == "comments" || authContext.componentType=="createComment") {
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
      className={authContext.isEdit ||(authContext.componentType == "createComment") || isExpand ? "text-editor show-border" : "text-editor"}
    >
      <EditorProvider
       editorProps={
        {
          attributes:{
            class:"cursor-text",
          }
        }
       } 
        slotBefore={
          authContext.isEdit || isExpand ? <MenuBar className="" /> : null
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
