import React from "react";
import "../Homepage/style/jumbotron.css";

export default function Jumbotron() {
	return (
		<>
			<div className="jumbotron-container">
				<div className="text-center py-5">
					<h1 className="text-light">
						Wanna be a part of our community builder team?
					</h1>
					<div className="d-inline-flex pt-5">
						<button
							className="fw-bold text-center text-light btn bg-primary-green btn-lg px-5 py-3 my-3 rounded-pill"
							type="button"
						>
							Join Us Here
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
