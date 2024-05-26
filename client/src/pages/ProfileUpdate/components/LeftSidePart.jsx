import React from "react";
// import { FaCamera } from "react-icons/fa";
import BasicInfo from "./BasicInfo";

const LeftSidePart = (props) => {
	return (
		<div className="my-5 col-12 col-lg-3">
			<div className="ms-4 me-4 me-lg-0 h-lg-50 h-100">
				{/* <p>Left side part</p> */}
				<div className="d-flex flex-column align-items-center justify-content-between h-100 left-part-container">
					<div className="d-flex flex-column align-items-center">
						<div className="d-flex flex-column align-items-center text-center rounded-circle profile-image-container position-relative">
							<img
								// src={props.profileImage}
								// alt={`${props.userName} Avatar`}
								src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
								alt="Avatar Placeholder"
								className="d-block w-100 rounded-circle avatar-image border-primary-yellow border-1"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
							/>
							<div className="position-absolute rounded-pill user-role bg-primary-yellow text-white fw-bolder">
								Admin
							</div>
						</div>
						<h1 className="mt-5 username-container">Bao Hoo</h1>
					</div>
					<div className="w-100 d-flex flex-row align-items-center justify-content-between profile-figures">
						<div className="d-flex flex-column align-items-center">
							<strong>4</strong>
							<p>Threads</p>
						</div>
						<div className="d-flex flex-column align-items-center">
							<strong>20</strong>
							<p>Posts</p>
						</div>
						<div className="d-flex flex-column align-items-center">
							<strong>11-01-2024</strong>
							<p>Joined Date</p>
						</div>
					</div>
					<div className="w-100">
						<BasicInfo id={0} displayInfo="Email" />
						<BasicInfo id={1} displayInfo="Phone" />
						<BasicInfo id={2} displayInfo="Address" />
						<BasicInfo id={3} displayInfo="Gender" />
					</div>
					<button className="bg-danger text-white fw-semibold border-0 py-2 w-100 rounded-pill deactivate-btn">
						Deactivate account
					</button>
				</div>
			</div>
		</div>
	);
};

export default LeftSidePart;
