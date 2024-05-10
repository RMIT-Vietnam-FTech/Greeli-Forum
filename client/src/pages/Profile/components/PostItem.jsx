import { IoMdMore } from "react-icons/io";
import { MdInsertComment, MdShare } from "react-icons/md";
import { TbArrowBigDown, TbArrowBigUpFilled } from "react-icons/tb";

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
		<div className="bg-primary-green post-item px-3 py-3 mb-3">
			<div className="w-100 d-flex justify-content-end">
				<IoMdMore size={"2vw"} color={"white"} />
			</div>
			<div className="container">
				<div className="row w-100">
					<div className="col-9 main-content">
						<div className="d-flex flex-row post-author">
							<img
								className="rounded-circle"
								src="https://via.placeholder.com/50"
								alt="author"
							/>
							<div className="d-flex flex-column justify-content-center">
								<div
									className="w-100 d-flex flex-row justify-content-around"
								>
									<p className="text-primary-yellow fw-bold m-0">
										{thread}/{title}
									</p>
									<p className="text-white m-0">
										{createdDate}
									</p>
								</div>
								<p className="text-white p-0 m-0">{author}</p>
							</div>
						</div>
						<p className="text-white mt-3">{content}</p>
						<div className="d-flex justify-content-start interaction-menu">
							<div className="bg-primary-green-900 text-white d-flex flex-row justify-content-around align-items-center py-2 upvote">
								<TbArrowBigUpFilled size={"2vw"} color={"white"} />
								<p className="p-0 m-0">{upvote}</p>
								<TbArrowBigDown size={"2vw"} color={"white"} />
							</div>
							<div className="bg-primary-green-900 text-white d-flex flex-row justify-content-around align-items-center py-2 comment">
								<MdInsertComment size={"2vw"} color={"white"} />
								<p className="p-0 m-0">{comment}</p>
							</div>
							<div className="bg-primary-green-900 text-white d-flex flex-row justify-content-around align-items-center py-2 share">
								<MdShare size={"2vw"} color={"white"} />
								<p className="p-0 m-0">Share</p>
							</div>
						</div>
					</div>
					<div className="position-relative col-3">
						<img className="post-img position-absolute my-auto" src={postImgURL} alt="post" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
