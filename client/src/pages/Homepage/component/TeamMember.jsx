import React from "react";
import members from "../data/memberInfo";
import "../style/member.css";
const TeamMember = () => {
	return (
		<>
			<div className="container">
				<div className="row justify-content-md-center">
					<div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
						<h1 className="display-5 fw-semibold text-center text-greeli-emphasis w-100 mb-3">
							Our Team
						</h1>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row gy-4 gy-lg-0 gx-xxl-5 justify-content-center">
					{members.slice(0, 3).map((member) => (
						<div
							className="col-11 col-md-6 col-lg-4 rounded-3"
							key={member.id}
						>
							<div className="card rounded-4 overflow-hidden">
								<div className="card-body p-0">
									<figure className="m-0 p-0 rounded-4 shadow-lg rounded">
										<img
											className="img-fluid "
											loading="lazy"
											src={member.src}
											alt=""
										/>
										<figcaption className="m-0 p-4">
											<h4 className="mb-1 text-black">
												{member.name}
											</h4>
											<p className="mb-0 text-black">
												{member.position}
											</p>
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="row gy-4 gy-lg-0 gx-xxl-5 justify-content-center mt-2">
					{members.slice(3, 5).map((member) => (
						<div
							className="col-11 col-md-6 col-lg-4"
							key={member.id}
						>
							<div className="card border-0 rounded-4 overflow-hidden">
								<div className="card-body p-0">
									<figure className="m-0 p-0">
										<img
											className="img-fluid rounded-top-4"
											loading="lazy"
											src={member.src}
											alt={`${member.name}'s profile image`}
										/>
										<figcaption className="m-0 p-4">
											<h4 className="mb-1 text-black">
												{member.name}
											</h4>
											<p className="text-black mb-0">
												{member.position}
											</p>
										</figcaption>
									</figure>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default TeamMember;
