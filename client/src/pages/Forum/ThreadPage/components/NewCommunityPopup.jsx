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
import CreateCommunityDropZone from "./CreateCommunityDropZone";
export default function NewCommunityPopUp({ isOpen, setIsOpen }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [inputPostTitle, setInputPostTitle] = useState("");
  const errorTexts = [
    "min 5 and max 20 characters",
    "title is already existed!",
  ];
  const navigate = useNavigate();
  async function handleData() {
    try {
      const postTitleInput = document.querySelector(".post-title");

      if (inputPostTitle.length >= 5 && inputPostTitle.length <= 20) {
        setFile(null);
        setIsOpen(false);

        const formData = new FormData();
        formData.append("title", inputPostTitle);
        if (file) {
          formData.append("uploadFile", file[0]);
        } else {
          formData.append("uploadFile", null);
        }
        formData.append("content", JSON.stringify(description));

        const res = await axios.post(
          "http://localhost:3001/api/v1/threads",
          formData,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigate(`/forum/communities/${res.data}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function displayError(e) {
    try {
      const titleWarning = document.querySelector(".title-warning");
      if (e.target.value.length < 5 || e.target.value.length > 50) {
        titleWarning.classList.remove("d-none");
        titleWarning.innerHTML = errorTexts[0];
      } else {
        await axios.post(
          "http://localhost:3001/api/v1/threads/validation",
          { title: e.target.value },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
      }
    } catch (error) {
      if (error.response.status === 403) {
        const titleWarning = document.querySelector(".title-warning");
        titleWarning.classList.remove("d-none");
        titleWarning.innerHTML = errorTexts[1];
      }
    }
  }

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <div className="modal-wrapper">
      <div
        style={{ backgroundColor: "white" }}
        id="post-modal"
        className="shadow-lg p-3 d-flex flex-column  align-items-end "
      >
        {/*------- Title Create Post and close button--------------------------------------------------------*/}
        <div style={{borderRadius:"20px"}} className="w-100 h-100 border border-2 border-primary-green-900 p-3">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="text-dark">Create Community</h2>
            <button
              className="bg-transparent border-0 text-dark"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <RiCloseLargeLine />
            </button>
          </div>

          <div
            style={{ height: "100px" }}
            className="mt-3 w-100 d-flex justify-content-between gap-4"
          >
            {/*---------UploadFile ------------------------------------------------------------------------------*/}
            <div
              style={{ width: "100px", weight: "100px" }}
              className="rounded-circle  "
            >
              <CreateCommunityDropZone
                setFile={setFile}
                file={file}
                isReset={!isOpen}
              />
            </div>

            {/*---------Post Title Input-------------------------------------------------------------------------*/}
            <div className="w-100 d-flex mt-3 position-relative">
              <p
                style={{ left: "0px", fontSize: "18px" }}
                className="text-danger position-absolute"
              >
                *title
              </p>
              <input
                className=" w-100  bg-transparent position-relative  text-dark border-0 border-bottom border-dark shadow-none"
                type="text"
                name="title"
                minLength={5}
                maxLength={20}
                onChange={(e) => {
                  setInputPostTitle(e.target.value);
                }}
                onFocus={() => {
                  const titleWarning = document.querySelector(".title-warning");
                  titleWarning.classList.add("d-none");
                }}
                onBlur={(e) => {
                  displayError(e);
                }}
              />
              <p
                className="position-absolute text-dark"
                style={{ right: "0", bottom: "0" }}
              >
                {inputPostTitle.length}/20
              </p>
            </div>
          </div>
          <p className="w-100 text-end  title-warning text-danger d-none"></p>
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
      </div>
    </div>,
    document.querySelector("body")
  );
}
