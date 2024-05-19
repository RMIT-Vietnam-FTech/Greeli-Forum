import React from "react";
import Popup from "reactjs-popup";
import Image from "react-bootstrap/Image";
import "reactjs-popup/dist/index.css";
import "./PreventionPopup.css";
import { IoWarning } from "react-icons/io5";

const PreventionPopup = (props) => {
	const {
		modalTitle,
		buttonStyle,
		buttonValue,
		ariaLabel,
		action,
		warningMessage,
		actionFunction,
	} = props;
	return (
		<Popup
			trigger={
				<button aria-label={ariaLabel} className={buttonStyle}>
					{" "}
					{buttonValue}{" "}
				</button>
			}
			modal
		>
			{(close) => (
				<div className="popup-modal">
					{/* <div>
						<Image src="logo.svg" alt="Greeli Logo" />
					</div> */}
					<div className="text-danger text-center fw-bold popup-header">
						{" "}
						{modalTitle}{" "}
					</div>
					<p className="confirm-message">
						Are you sure you want to{" "}
						<span className="text-danger">{action}</span>?{" "}
					</p>
					<div className="popup-content border-left-">
						<div className="warning-title text-danger fw-bold">
							<IoWarning className="text-danger" size={32} /> Warning
						</div>
						<p className="text-warning m-0">{warningMessage}</p>
					</div>
					<div className="popup-actions w-100 d-flex justify-content-between">
						<button
							className="popup-button bg-primary-green text-white"
							onClick={() => {
								// console.log("Modal closed");
								close();
							}}
						>
							No, cancel
						</button>
						<button
							className="popup-button bg-danger text-white"
							onClick={() => {
								// console.log("Action confirmed");
								close();
								actionFunction();
							}}
						>
							Confirm Action
						</button>
					</div>
				</div>
			)}
		</Popup>
	);
};

export default PreventionPopup;
