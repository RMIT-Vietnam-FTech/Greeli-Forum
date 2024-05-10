import { createContext } from "react";
import { useContext, useState } from "react";

import EditContext from "../../contexts/AuthContext";

export default function DropDown({ isVertical }) {
  
  //console.log("dis play Dropdown Data: \n\n");
  //console.log("isVertical: " + isVertical);

  const editContext = useContext(EditContext);
  function handleEdit() {
    editContext.toggleIsEdit();
  }
  if (
    editContext.isAuthor.current && (editContext.componentType == "threads" ||editContext.componentType == "comments")
  ) {
    return(
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
  if (editContext.componentType == "posts") {
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
          {editContext.isAuthor.current ? (
            <li>
              <a onClick={handleEdit} className={"dropdown-item"} href="#">
                Edit 
              </a>
            </li>
          ) : null}

          <li>
            <a className="dropdown-item" href="#">
              Save
            </a>
          </li>
          <li>
            {editContext.isAuthor.current ? (
              <a className="dropdown-item" href="#">
                Delete
              </a>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
  return null;
}
