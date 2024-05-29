import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CommentSkeleton({ nOfCard }) {
  return Array(nOfCard)
    .fill(0)
    .map((item, index) => (
      <div className="my-5" key={index}>
        <div className="d-flex gap-2">
          <Skeleton
            containerClassName="d-flex"
            circle
            width="30px"
            height="30px"
          />
          <Skeleton containerClassName="d-flex" width="50px" height="20px" />
          <Skeleton containerClassName="d-flex" width="20px" height="20px" />
        </div>
        <div className="ms-4">
          <Skeleton width="50%" />
          <Skeleton width="45%" />
          <Skeleton width="40%" />
        </div>
      </div>
    ));
}
