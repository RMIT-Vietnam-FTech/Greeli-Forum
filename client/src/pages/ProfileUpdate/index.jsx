import React from "react";
import { useUserContext } from "../../context/UserContext";
import { FaCamera } from "react-icons/fa";
import LeftSidePart from "./components/LeftSidePart";
import RightSidePart from "./components/RightSidePart";
import "./styles.css";

const ProfileUpdate = (props) => {
	//
	return (
		<div className="container-fluid profile-page-container">
			{/* <h1>Profile Update</h1> */}
			<div className="row row-cols-12 h-100">
				<LeftSidePart />
				<RightSidePart />
			</div>
		</div>
	);
};

export default ProfileUpdate;
