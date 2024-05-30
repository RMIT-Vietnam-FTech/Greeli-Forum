import React from "react";
import Image from "react-bootstrap/Image";
import { IoWarning } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./PreventionPopup.css";

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
				<button
					aria-label={ariaLabel}
					type="button"
					className={buttonStyle}
				>
					{buttonValue}
				</button>
			}
			modal
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			{(close) => (
				<div
					className="popup-modal"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
				>
					<div
						id="modal-title"
						className="text-danger text-center fw-bold popup-header"
					>
						{modalTitle}
					</div>
					<p className="confirm-message">
						Are you sure you want to{" "}
						<span className="text-danger">{action}</span>?
					</p>
					<div className="popup-content">
						<div className="warning-title text-danger fw-bold d-flex align-items-center">
							<IoWarning
								className="text-danger"
								size={32}
								aria-hidden="true"
							/>
							<span>Warning</span>
						</div>
						<p id="modal-description" className="text-warning m-0">
							{warningMessage}
						</p>
					</div>
					<div className="popup-actions w-100 d-flex justify-content-between">
						<button
							className="popup-button bg-primary-green text-white border-0"
							type="button"
							onClick={() => {
								close();
							}}
						>
							No, cancel
						</button>
						<button
							className="popup-button bg-danger text-white border-0"
							onClick={() => {
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
