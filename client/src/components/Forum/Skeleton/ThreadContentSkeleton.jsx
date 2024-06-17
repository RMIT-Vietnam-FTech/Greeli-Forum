import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ThreadContentSkeleton() {
	return (
		<>
			<section className="d-flex gap-3">
				<Skeleton
					containerClassName="d-flex"
					width="150px"
					height="150px"
					circle
				/>
				<div className="w-75">
					<Skeleton
						width="150px"
						height="30px"
						style={{ borderRadius: "20px" }}
					/>
					<Skeleton className="mt-2" width="40%" height="35px" />
					<Skeleton className="mt-4" width="100%" height="20px" />
					<Skeleton className="mt-2" width="95%" height="20px" />
					<Skeleton className="mt-2" width="90%" height="20px" />
					<Skeleton className="mt-2" width="85%" height="20px" />
				</div>
			</section>
			<Skeleton className="mt-4 rounded-5" height="35px" width="100%" />
		</>
	);
}
