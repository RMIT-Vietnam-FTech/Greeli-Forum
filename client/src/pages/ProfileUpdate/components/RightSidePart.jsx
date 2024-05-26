import { Link } from "react-router-dom";
import { useState } from "react";
import ThreadGallery from "./ThreadGallery";
import PostItem from "./PostItem";

const RightSidePart = (props) => {
	const [tab, setTab] = useState("Created Posts");
	return (
		<div className="col-12 col-lg-9 h-lg-50 h-100 px-lg-5 px-0">
			<div className="d-flex flex-column ms-5 ms-lg-0 me-5 me-lg-0 h-lg-50 h-100">
				<div>
					<h1 className="mt-5 profile-title">Thread Gallery</h1>

					{/* DROPDOWN */}
					<div className="dropdown position-static d-flex flex-row justify-content-end">
						<button
							className="btn btn-primary-green dropdown-toggle"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							style={{ width: "160px" }}
						>
							{tab}{" "}
						</button>
						<ul
							className="dropdown-menu"
							aria-labelledby="dropdownMenuButton1"
							style={{ width: "160px" }}
						>
							<li>
								<Link
									className="dropdown-item"
									onClick={() => {
										setTab("Created Posts");
									}}
								>
									Created Threads
								</Link>
							</li>
							<li>
								<Link
									className="dropdown-item"
									onClick={() => {
										setTab("Archieved Posts");
									}}
								>
									Archieved Threads
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<ThreadGallery />
			</div>
		</div>
	);
};
export default RightSidePart;
