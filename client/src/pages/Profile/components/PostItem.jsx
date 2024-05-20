import { IoMdMore } from "react-icons/io";
import { MdInsertComment, MdShare } from "react-icons/md";
import { TbArrowBigDown } from "react-icons/tb";

const PostItem = (props) => {
	const {
		thread,
		title,
		content,
		createdDate,
		author,
		postImgURL,
		upvote,
		comment,
	} = props.post;

	return (
		<div
			className="bg-primary-green post-item px-3 py-3 mb-3"
			role="article"
		>
			<div className="w-100 d-flex justify-content-end">
				<button
					aria-label="More options"
					className="btn btn-link p-0 text-decoration-none"
				>
					<IoMdMore size={"28px"} color={"white"} />
				</button>
			</div>
			<div className="d-flex w-100 container post-main-container">
				<div className="post-main-content">
					<div className="d-flex flex-row post-author">
						<img
							className="rounded-circle"
							src="https://via.placeholder.com/50"
							alt={`Author ${author}`}
						/>
						<div className="d-flex flex-column justify-content-center">
							<div className="w-100 d-flex flex-row flex-sm-nowrap flex-wrap justify-content-start justify-content-sm-around">
								<p className="text-primary-yellow fw-bold m-0">
									{thread}/{title}
								</p>
								<p className="text-white m-0">{createdDate}</p>
							</div>
							<p className="text-white p-0 m-0">{author}</p>
						</div>
					</div>
					<p className="w-100 text-white mt-3">{content}</p>
					<div className="d-flex justify-content-start interaction-menu">
						<button
							aria-label={`Upvote, current count: ${upvote}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-start align-items-center py-2 px-2 upvote btn btn-link p-0 text-decoration-none"
						>
							<p className="p-0 m-0">{upvote}</p>
							<TbArrowBigDown size={"2vw"} color={"white"} />
						</button>
						<button
							aria-label={`Comments, current count: ${comment}`}
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-start align-items-center py-2 px-2 comment btn btn-link p-0 text-decoration-none"
						>
							<MdInsertComment size={"2vw"} color={"white"} />
							<p className="p-0 m-0">{comment}</p>
						</button>
						<button
							aria-label="Share this post"
							className="bg-primary-green-900 text-white d-flex flex-row justify-content-start align-items-center py-2 px-2 share btn btn-link p-0 text-decoration-none"
						>
							<MdShare size={"2vw"} color={"white"} />
							<p className="p-0 m-0">Share</p>
						</button>
					</div>
				</div>
				{postImgURL && (
					<div className="d-none d-sm-block">
						<img
							className="post-img"
							src={postImgURL}
							alt={`Post titled ${title}`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostItem;
