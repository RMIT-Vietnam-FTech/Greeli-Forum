import { createContext } from "react";
import { useContext, useState } from "react";

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
  const navigate = useNavigate();
  function handleEdit() {
    editContext.setIsEdit(true);
  }
  function handleSave() {}
  async function handleDelete() {
    try {
      //delete and redirect
      const path = `http://localhost:3001/api/v1/posts/${postId}`;
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
            <a className="dropdown-item" onClick={handleSave} href="#">
              Save
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
