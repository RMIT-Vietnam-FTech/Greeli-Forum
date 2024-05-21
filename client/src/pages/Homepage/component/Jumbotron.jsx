import React from "react";
import "../style/jumbotron.css";

export default function Jumbotron() {
	return (
		<>
			<div className="jumbotron container-fluid py-5 text-center">
				<h1 className="text-light text-center pb-5">
					Wanna be a part of our community builder team?
				</h1>
				<div className="d-block">
					<button
						className="join-us"
						type="button"
					>
						Join Us Here
					</button>
				</div>
			</div>
		</>
	);
}
