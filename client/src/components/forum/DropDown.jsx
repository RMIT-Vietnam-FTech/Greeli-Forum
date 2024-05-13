import { createContext } from "react";
import { useContext, useState } from "react";

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { EditContext } from "../../context/EditContext";
export default function DropDown({ isVertical, componentType }) {
	const editContext = useContext(EditContext);
	const authorizationContext = useContext(AuthorizationContext);
	function handleEdit() {
		editContext.setIsEdit(true);
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
							<a
								onClick={handleEdit}
								className={"dropdown-item"}
								href="#"
							>
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
						{authorizationContext.isAuthor.current ? (
							<a className="dropdown-item" href="#">
								Delete
							</a>
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
						<a
							onClick={handleEdit}
							className={"dropdown-item"}
							href="#"
						>
							Edit
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
