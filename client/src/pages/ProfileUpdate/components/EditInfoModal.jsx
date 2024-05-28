import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosSettings } from "react-icons/io";
import "reactjs-popup/dist/index.css";
import { MdSettingsInputSvideo } from "react-icons/md";
import ChangePassword from "./ChangePassword";
import ChangeProfileInfo from "./ChangeProfileInfo";
import ChangeAvatar from "./ChangeAvatar";
import { useProfileContext } from "../../../context/ProfileContext";

const EditInfoModal = () => {
	const data = useProfileContext();
	const { profileImage, username } = data;
	const [editTab, setEditTab] = useState("Profile");

	const handleChangeTab = (e) => {
		const currentTabContent = e.target.innerHTML;
		const siblingTabs = e.target.parentElement.children;
		if (siblingTabs[0].innerHTML === currentTabContent) {
			siblingTabs[0].classList.add("edit-tab-active");
			siblingTabs[1].classList.remove("edit-tab-active");
		} else {
			siblingTabs[1].classList.add("edit-tab-active");
			siblingTabs[0].classList.remove("edit-tab-active");
		}
	};

	return (
		<Popup
			trigger={
				<button
					aria-label="Edit Info Button"
					className="position-absolute end-0 border-0 bg-transparent"
				>
					<IoIosSettings className="info-icon rounded-circle bg-primary-green-100 text-primary-green-900" />
				</button>
			}
			modal
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			{(close) => (
				<div>
					<div className="container">
						<div className="row pt-3">
							<div className="col-3 d-flex flex-row justify-content-end">
								<img
									src={
										profileImage === "" ||
										profileImage === null ||
										profileImage === undefined
											? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
											: profileImage
									}
									alt={`${username} Avatar`}
									className="d-block p-0 rounded-circle avatar-image object-fit-cover border border-3 border-primary-yellow"
									style={{ aspectRatio: "1/1", width: "120px" }}
									data-bs-toggle="modal"
									data-bs-target="#exampleModal"
								/>
							</div>
							<div className="col-9 d-flex flex-row gap-3 align-items-end">
								<p
									className="edit-tab edit-tab"
									onClick={(e) => {
										setEditTab("Profile Image");
										handleChangeTab(e);
									}}
								>
									Profile Image
								</p>
								<p
									className="edit-tab edit-tab-active"
									onClick={(e) => {
										setEditTab("Profile");
										handleChangeTab(e);
									}}
								>
									Profile
								</p>
								<p
									className="edit-tab"
									onClick={(e) => {
										setEditTab("Password");
										handleChangeTab(e);
									}}
								>
									Password
								</p>
							</div>
						</div>
					</div>
					<div className="p-0 m-0" style={{ height: "476px" }}>
						{editTab === "Profile Image" && <ChangeAvatar close={close} />}
						{editTab === "Profile" && <ChangeProfileInfo close={close} />}
						{editTab === "Password" && <ChangePassword close={close} />}
					</div>
				</div>
			)}
		</Popup>
	);
};

export default EditInfoModal;
