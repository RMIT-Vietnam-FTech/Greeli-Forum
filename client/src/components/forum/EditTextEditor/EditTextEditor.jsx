import { EditorProvider } from "@tiptap/react";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import { lowlight } from "lowlight";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { Node, mergeAttributes } from "@tiptap/core";

import { EditContext } from "../../../context/EditContext";
import EditTextBar from "./EditTextBar";
import MenuBar from "./MenuBar";

//Utilities in tiptap
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
{
  /*custom embed video*/
}
const Video = Node.create({
  name: "video",
  group: "block",
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ({ editor, node }) => {
      const div = document.createElement("div");
      div.className =
        "ratio ratio-16x9" + (editor.isEditable ? " cursor-pointer" : "");
      const iframe = document.createElement("iframe");
      if (editor.isEditable) {
        iframe.className = "pe-none";
      }
      iframe.width = "640";
      iframe.height = "360";
      iframe.frameborder = "0";
      iframe.allowfullscreen = "";
      iframe.src = node.attrs.src;
      div.append(iframe);
      return {
        dom: div,
      };
    };
  },
});

export const extensions = [
  Video,
  Image.configure({
    HTMLAttributes: {
      className: "mw-100",
    },
    allowBase64: true,
  }),
  Dropcursor,
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

export default function EditTextEditor({ content, componentType, isOverFlow }) {
  //edit text editor for thread and post only
  const editContext = useContext(EditContext);
  return (
    <div
      tabIndex="0"
      className={
        editContext.isEdit
          ? "text-editor text-greeli-emphasis show-border"
          : "text-editor text-greeli-emphasis"
      }
    >
      <EditorProvider
        editorProps={{
          attributes: {
            // class: "cursor-text",
            class: isOverFlow ? "line-clamp" : "",
          },
        }}
        slotBefore={editContext.isEdit ? <MenuBar className="" /> : null}
        slotAfter={
          editContext.isEdit ? (
            <EditTextBar content={content} componentType={componentType} />
          ) : null
        }
        extensions={extensions}
        editable={editContext.isEdit}
        content={content}
      ></EditorProvider>
    </div>
  );
}
