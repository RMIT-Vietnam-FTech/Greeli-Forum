import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ThreadItemSkeleton = ({ item }) => {
	return Array(item)
		.fill(0)
		.map((item) => (
			<div
				className="bg-primary-green post-item px-3 py-3 mb-3"
				role="article"
			>
				<div className="w-100 d-flex justify-content-end">
					<button
						aria-label="More options"
						className="btn btn-link p-0 text-decoration-none"
					>
						{/* <IoIosMore className="info-icon" color={"white"} /> */}
					</button>
				</div>
				<div className="d-flex w-100 container post-main-container justify-content-between">
					<div className="post-main-content d-flex flex-column justify-content-between">
						<div className="d-flex flex-row post-author">
							<Skeleton circle width={50} height={50} />
							<div className="d-flex flex-md-column flex-row-reverse justify-content-center">
								<div className="w-100 d-flex flex-row flex-sm-nowrap flex-wrap justify-content-start justify-content-sm-around">
									<Skeleton count={1} width={300} />
								</div>
								<Skeleton width={100} />
							</div>
						</div>
						<Skeleton count={3} width={300} />
						<div className="d-flex justify-content-start interaction-menu">
							<Skeleton width={50} />
							<Skeleton width={50} />
						</div>
					</div>
				</div>
			</div>
		));
};

export default ThreadItemSkeleton;
