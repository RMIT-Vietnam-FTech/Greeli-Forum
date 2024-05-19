import React from "react";
import Popup from "reactjs-popup";

const DeactivatingPopup = () => (
	<Popup trigger={<button>Trigger</button>} position="top left">
		{(close) => (
			<div>
				Content here
				<button className="close" onClick={close}>
					&times;
				</button>
			</div>
		)}
	</Popup>
);

export default DeactivatingPopup;
