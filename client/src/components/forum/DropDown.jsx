import { useContext, useState, useEffect } from "react";

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { EditContext } from "../../context/EditContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function DropDown({
  isVertical,
  componentType,
  threadId,
  postId,
}) {
  // console.log(`check input: \n componentType:${componentType}\n threadId: ${threadId}\n postId: ${postId}`)
  const editContext = useContext(EditContext);
  const authorizationContext = useContext(AuthorizationContext);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkSavingStatus().then((res) => {
      setIsSaved(res);
    });
  }, []);
  async function checkSavingStatus() {
    const path = `/api/user/${
      JSON.parse(localStorage.getItem("user")).id
    }/archived_posts`;
    const archivedPosts = await axios
      .get(path, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => res.data);
    return archivedPosts.some((object) => {
      return object._id === postId;
    });
  }

  function handleEdit() {
    editContext.setIsEdit(true);
  }

  async function handleSave() {
    try {
      const path = `/api/user/${
        JSON.parse(localStorage.getItem("user")).id
      }/archived_posts`;
      await axios.post(
        path,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setIsSaved(true);
    } catch (e) {
      console.error(e.message.data);
    }
  }

  async function handleUnSave() {
    try {
      const path = `/api/user/${
        JSON.parse(localStorage.getItem("user")).id
      }/archived_posts`;
      await axios.delete(
        path,

        {
          data: {
            postId: postId,
          },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setIsSaved(false);
    } catch (e) {
      console.error(e.message.data);
    }
  }

  async function handleDelete() {
    try {
      //delete and redirect
      const path = `/api/v1/posts/${postId}`;
      await axios.delete(
        path,

        {
          data: {
            threadId: threadId,
          },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      navigate("/forum");
    } catch (error) {
      console.error(error.message);
    }
  }
  if (componentType == "post") {
    return (
      <div className="dropdown position-absolute">
        <button
          className={
            "btn btn-secondary d-flex gap-1 bg-transparent border-0 " +
            (isVertical ? "flex-column" : "flex-row")
          }
          data-bs-toggle="dropdown"
        >
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
        </button>
        <ul className="dropdown-menu">
          {authorizationContext.isAuthor.current ? (
            <li>
              <a onClick={handleEdit} className={"dropdown-item"} href="#">
                Edit
              </a>
            </li>
          ) : null}

          <li>
            <a className="dropdown-item" onClick={isSaved?handleUnSave:handleSave} href="#">
              {isSaved?"unsaved":"save"}
            </a>
          </li>
          <li>
            {authorizationContext.isAuthor.current ? (
              <Link onClick={handleDelete} className="dropdown-item" to="../">
                Delete
              </Link>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
  if (componentType == "thread" && authorizationContext.isAuthor.current) {
    return (
      <div className="dropdown position-absolute">
        <button
          className={
            "btn btn-secondary d-flex gap-1 bg-transparent border-0 " +
            (isVertical ? "flex-column" : "flex-row")
          }
          data-bs-toggle="dropdown"
        >
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (isVertical ? "bg-white" : "bg-primary-green-900")
            }
          />
        </button>
        <ul className="dropdown-menu">
          <li>
            <a onClick={handleEdit} className={"dropdown-item"} href="#">
              Edit
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
