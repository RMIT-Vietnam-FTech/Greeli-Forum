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
import CreateCommentBottomBar from "./CreateCommentBottomBar";
import { PopupContext } from "../../../../../context/PopupContext";

import { useLogin } from "../../../../../hooks/useLogin";
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
    Dropcursor,
    Image.configure({
      HTMLAttributes: {
        class: "w-100",
      },
      allowBase64: true,

    }),
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
    handleDrop: function (view, event, slice, moved) {
      if (
        !moved &&
        event.dataTransfer &&
        event.dataTransfer.files &&
        event.dataTransfer.files[0]
      ) {
        let file = event.dataTransfer.files[0];
        let filesize = (file.size / 1024 / 1024).toFixed(4);
        if (
          (file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "image/webp" ||
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/webm") &&
          filesize < 5
        ) {
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.src = _URL.createObjectURL(file);
          console.log(`image: ${img}`);
          img.onload = function () {
            uploadImage(file)
              .then(function (response) {
                let image = new Image();
                image.src = response;
                image.onload = function () {
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                  });
                  const node = schema.nodes.image.create({ src: response });
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  );
                  return view.dispatch(transaction);
                };
              })
              .catch(function (error) {
                if (error) {
                  window.alert("There was a problem uploading your image, please try again.");

                }
              });
          };
        } else {
          window.alert("Images need to be in jpg or png format and less than 10mb in size.");

        }
        return true;
      }
      return false;
    },
  };
  function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return axios
      .post("http://localhost:3001/api/v1/comments/upload", formData)
      .then((res) => res.data);
  }

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
    <div
      tabIndex="0"
      aria-label="create comment"
      onKeyDown={handleDisplay}
      onClick={handleDisplay}
      className={"text-editor text-greeli-emphasis show-border"}
    >
      <EditorProvider
        slotBefore={editContext.isEdit ? <MenuBar className="" /> : null}
        slotAfter={editContext.isEdit ? <CreateCommentBottomBar /> : null}
        extensions={extensions}
        editorProps={editorProps}
        editable={true}
        content=""
      ></EditorProvider>
    </div>
  );
}
