import React, { createContext, useState } from "react";
import { useEffect } from "react";
import {  EditorProvider} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { lowlight } from "lowlight";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import EditableContext from "../../contexts/EditableContext";

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
    placeholder: "Comment ...",
    showOnlyWhenEditable: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    languageClassPrefix: "language-",
  }),
];


export default function TextEditor({
  content,
  editableStatus,
  allowClickToEditable,
  resetContentWhenDone,
  crudType,
  componentType
}) {
  console.log("editable status"+editableStatus);
  const [isEditable, setIsEditable] = useState(editableStatus);
  const [isHandleDisplay, setHandleIsDisplay] = useState(resetContentWhenDone);
  function handleDisplay() {
    if(!isEditable){
      toggleEditable();
    }
  }
  function toggleEditable(){
    setIsEditable(editable=>!editable)
  }
  const settingContext = {
    setIsEditable,
    isEditable,
    toggleEditable,
    content
  }
  return (
    <EditableContext.Provider value={settingContext}>

    <div
      onClick={allowClickToEditable ? handleDisplay : null}
      className={isEditable?"text-editor":null}
    >
      <EditorProvider
        slotBefore={isEditable ? <MenuBar className="" /> : null}
        slotAfter={isEditable ? <EditBar reset={resetContentWhenDone} crudType={crudType} /> : null}
        extensions={extensions}
        editable={isEditable}
        content={content}
      ></EditorProvider>
      {}
    </div>
    </EditableContext.Provider>
  );
}