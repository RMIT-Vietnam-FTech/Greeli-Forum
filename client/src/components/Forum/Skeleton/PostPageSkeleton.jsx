import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function PostPageSkeleton() {
	return (
		<div>
			<div className="mx-auto my-2" style={{ width: "95%" }}>
				{/*header -- user information*/}
				<div className="d-flex gap-2 align-items-center w-100 my-2 p-3">
					<Skeleton
						containerClassName="d-flex"
						circle={true}
						width="30px"
						height="30px"
					/>
					<Skeleton
						containerClassName="d-flex"
						height="20px"
						width="70px"
					/>
					<Skeleton
						containerClassName="d-flex"
						height="20px"
						width="40px"
					/>
				</div>
				<Skeleton className="mt-2 mb-4" height="45vh" />{" "}
				{/*image -- post image*/}
				{/*body -- post body*/}
				<Skeleton width="100%" />
				<Skeleton width="90%" />
				<Skeleton width="80%" />
				<div className="d-flex my-2">
					<Skeleton
						width="45px"
						height="20px"
						className="me-2"
						containerClassName="d-flex"
						count={2}
					/>
				</div>
			</div>

			<Skeleton
				className="my-4"
				style={{ borderRadius: "20px" }}
				height="30px"
			/>
		</div>
	);
}
