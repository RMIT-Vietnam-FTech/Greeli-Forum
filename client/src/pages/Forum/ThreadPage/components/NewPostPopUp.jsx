import axios, { formToJSON } from "axios";
import FormData from "form-data";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ReactDom from "react-dom";
import { IoMdClose } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";
import DropZoneFile from "./DropZoneFile";
import PopupEditor from "./PopupEditor/PopupEditor";
import { useNavigate, useParams } from "react-router-dom";
axios.defaults.withCredentials = true;

export default function NewPostPopUp({ isOpen, setIsOpen, belongToThread }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const inputPostTitle = useRef("");
  const navigate = useNavigate();
  const { threadId } = useParams();
  async function handleData() {
    try {
      const postTitleInput = document.querySelector(".post-title");

      if (
        postTitleInput.value.length >= 5 &&
        postTitleInput.value.length <= 50
      ) {
        setFile(null);
        setIsOpen(false);

        const formData = new FormData();
        formData.append("title", postTitleInput.value);
        if (file) {
          formData.append("uploadFile", file[0]);
        } else {
          formData.append("uploadFile", null);
        }
        formData.append("content", JSON.stringify(description));
        formData.append("belongToThread", belongToThread);

        const res = await axios.post(
          "http://localhost:3001/api/v1/posts",
          formData,
          {
            headers: {
              // Authorization: `Bearer ${
              //   JSON.parse(localStorage.getItem("user")).token
              // }`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigate(`/forum/threads/${threadId}/posts/${res.data}`);
      }
    } catch (e) {
      console.error(e.response);
    }
  }
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div className="modal-wrapper">
      <div
        id="post-modal"
        className="bg-primary-green-900  p-3 d-flex flex-column align-items-end "
      >
        {/*------- Title Create Post and close button--------------------------------------------------------*/}
        <div className="w-100 d-flex justify-content-between">
          <h2 className="text-white">Create Post</h2>
          <button
            className="bg-transparent border-0 text-white"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <RiCloseLargeLine />
          </button>
        </div>

        {/*---------UploadFile ------------------------------------------------------------------------------*/}
        <DropZoneFile setFile={setFile} file={file} isReset={!isOpen} />

        {/*---------Post Title Input-------------------------------------------------------------------------*/}
        <div className="w-100 d-flex mt-3">
          <label className="text-white d-flex align-items-center me-1">
            <h4>
              Title<span className="text-danger">*</span>
            </h4>
          </label>
          <input
            className="post-title w-100 rounded-3 bg-transparent position-relative  py-2 text-white border-solid border border-white shadow-none"
            type="text"
            name="title"
            minLength={5}
            maxLength={100}
            onChange={(e) => {
              inputPostTitle.current = e.target.current;
            }}
            onFocus={() => {
              const titleWarning = document.querySelector(".title-warning");
              titleWarning.classList.add("d-none");
            }}
            onBlur={(e) => {
              // toggle text class
              if (e.target.value.length < 5 || e.target.value.length > 50) {
                const titleWarning = document.querySelector(".title-warning");
                titleWarning.classList.remove("d-none");
              }
            }}
          />
          <p
            className="position-absolute text-white"
            style={{ right: "20px", top: "0" }}
          >
            /50
          </p>
        </div>

        <p className="title-warning text-danger d-none">
          at least 5 and maximum 50 characters
        </p>
        {/*----------------Text area---------------------------------------------------------------------------*/}

        <PopupEditor
          componentType="post"
          setDescription={setDescription}
          isReset={!isOpen}
        />

        {/*---------------Submit button------------------------------------------------------------------------*/}
        <Button onClick={handleData} className="mt-3 py-2">
          Submit
        </Button>
      </div>
    </div>,
    document.querySelector("body")
  );
}
