import { useEffect, useState } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import ImageOrVideo from "../../../components/forum/ImageOrVideo";

import Button from "react-bootstrap/Button";
import DropDown from "../../../components/forum/DropDown";
import EditTextEditor from "../../../components/forum/EditTextEditor/EditTextEditor";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
import NewPostPopUp from "./components/NewPostPopUp";
export default function ThreadHeader({ ...prop }) {
  const { title, uploadFile, content, objectId } = prop;
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    checkFollowingStatus().then((res) => {
      setIsFollowed(res);
    });
  }, []);

  async function checkFollowingStatus() {
    const path = `http://localhost:3001/api/user/${
      JSON.parse(localStorage.getItem("user")).id
    }/follow_threads`;
    const followThreads = await axios
      .get(path, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => res.data);
    return followThreads.some((object) => {
      return object._id === objectId;
    });
    
  }
  async function handleFollowThread() {
    try {
      const path = `http://localhost:3001/api/user/${
        JSON.parse(localStorage.getItem("user")).id
      }/follow_threads`;
      await axios.post(
        path,
        {
          threadId: objectId,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setIsFollowed(true);
    } catch (e) {
      console.error(e.message.data);
    }
  }
  async function handleUnFollowThread() {
    try {
      const path = `http://localhost:3001/api/user/${
        JSON.parse(localStorage.getItem("user")).id
      }/follow_threads`;
      await axios.delete(
        path,

        {
          data: {
            threadId: objectId,
          },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setIsFollowed(false);
    } catch (e) {
      console.error(e.message);
    }
  }
  return (
    <>
      <section className="w-100 position-relative">
        <EditContextProvider>
          <div className="d-flex align-items-start" style={{ width: "85%" }}>
            <h1 className="title fs-4 text-primary-green-900">{title}</h1>

            <Button
              onClick={isFollowed ? handleUnFollowThread : handleFollowThread}
              className=" ms-3 btn-primary-green-600 text-white rounded-4"
              style={{ width: "120px" }}
            >
              {isFollowed ? "followed" : "follow thread"}
            </Button>
          </div>

          <AuthorizationContextProvider
            componentType="thread"
            objectId={objectId}
          >
            <DropDown componentType="thread" />
          </AuthorizationContextProvider>

          {uploadFile ? (
            <div
              className="w-100 mt-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
              style={{ height: "400px" }}
            >
              <ImageOrVideo src={uploadFile} isPost={false} />
            </div>
          ) : null}

          <div className="w-100 mt-3">
            <EditTextEditor
              componentType="thread"
              content={JSON.parse(content)}
            />
          </div>
        </EditContextProvider>

        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-100 bg-transparent border-primary-green-900 text-primary-green-900 rounded-5 text-start"
        >
          Create Post +
        </Button>

        <NewPostPopUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          belongToThread={objectId}
        />
      </section>
    </>
  );
}
