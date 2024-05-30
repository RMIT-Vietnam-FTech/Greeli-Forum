import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { IoIosSettings } from "react-icons/io";
import { MdSettingsInputSvideo } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useProfileContext } from "../../../context/ProfileContext";
import { ThemeContext } from "../../../context/ThemeContext";
import ChangeAvatar from "./ChangeAvatar";
import ChangePassword from "./ChangePassword";
import ChangeProfileInfo from "./ChangeProfileInfo";

const EditInfoModal = () => {
	const data = useProfileContext();
	const { profileImage, username } = data;
	const [editTab, setEditTab] = useState("Profile");
	const { isDarkMode } = useContext(ThemeContext);

	const handleChangeTab = (e) => {
		const currentTabContent = e.target.innerHTML;
		const siblingTabs = e.target.parentElement.children;
		if (siblingTabs[0].innerHTML === currentTabContent) {
			siblingTabs[0].classList.add("edit-tab-active");
			siblingTabs[1].classList.remove("edit-tab-active");
			siblingTabs[2].classList.remove("edit-tab-active");
		} else if (siblingTabs[1].innerHTML === currentTabContent) {
			siblingTabs[1].classList.add("edit-tab-active");
			siblingTabs[0].classList.remove("edit-tab-active");
			siblingTabs[2].classList.remove("edit-tab-active");
		} else {
			siblingTabs[2].classList.add("edit-tab-active");
			siblingTabs[0].classList.remove("edit-tab-active");
			siblingTabs[1].classList.remove("edit-tab-active");
		}
	};

	return (
		<div className="position-absolute end-0 border-0 bg-transparent">
			<Popup
				trigger={
					<button
						aria-label="Edit Info Button"
						className="border-0 bg-transparent"
					>
						<IoIosSettings className="info-icon rounded-circle bg-primary-green-100 text-primary-green-900" />
					</button>
				}
				modal
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				{(close) => (
					<div
						className="bg-greeli-subtle"
						data-bs-theme={isDarkMode ? "dark" : "light"}
						style={{ borderRadius: "11px" }}
					>
						<div className="container">
							<div className="row pt-3">
								<div className="d-none d-md-block col-3 d-flex flex-row justify-content-end">
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
										style={{
											aspectRatio: "1/1",
											width: "120px",
										}}
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
									/>
								</div>
								<div className="col-9 d-flex flex-row gap-3 align-items-end bg-greeli-subtle">
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
							{editTab === "Profile Image" && (
								<ChangeAvatar
									close={close}
									setEditTab={setEditTab}
								/>
							)}
							{editTab === "Profile" && (
								<ChangeProfileInfo
									close={close}
									setEditTab={setEditTab}
								/>
							)}
							{editTab === "Password" && (
								<ChangePassword
									close={close}
									setEditTab={setEditTab}
								/>
							)}
						</div>
					</div>
				)}
			</Popup>
		</div>
	);
};

export default EditInfoModal;
