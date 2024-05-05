import { createContext } from "react";
import { useContext, useState } from "react";
import EditContext from "../contexts/EditContext";
export default function DropDownPost({ isAdmin, isCreator, inPost }) {
  const DropDownPostContext = useContext(EditContext);
  const authorizedStatus = isAdmin || isCreator;
 
      console.log(DropDownPostContext);
  function handleEdit() {
      console.log(DropDownPostContext);
    if(!DropDownPostContext.isEdit){
      DropDownPostContext.toggleIsEdit();
    }
  }
  return (
      <div className="dropdown position-absolute">
        <button
          className={
            "btn btn-secondary d-flex gap-1 bg-transparent border-0 " +
            (inPost ? "flex-column" : "flex-row")
          }
          data-bs-toggle="dropdown"
        >
          <div
            className={
              "dropdown-circle " +
              (inPost ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (inPost ? "bg-white" : "bg-primary-green-900")
            }
          />
          <div
            className={
              "dropdown-circle " +
              (inPost ? "bg-white" : "bg-primary-green-900")
            }
          />
        </button>
        <ul className="dropdown-menu">
          {authorizedStatus ? (
            <li>
              <a onClick={handleEdit} className={"dropdown-item"} href="#">
                Edit post
              </a>
            </li>
          ) : null}

          <li>
            <a className="dropdown-item" href="#">
              Save
            </a>
          </li>
          <li>
            {authorizedStatus ? (
              <a className="dropdown-item" href="#">
                Delete
              </a>
            ) : null}
          </li>
        </ul>
      </div>
  );
}
