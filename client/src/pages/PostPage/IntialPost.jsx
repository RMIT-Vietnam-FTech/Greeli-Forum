import AuthComponent from "../../components/forum/AuthComponent";
import Avatar from "../../components/forum/Avatar";
import ButtonUpvote from "../../components/forum/ButtonUpvote";
import DropDown from "../../components/forum/DropDown";
import ImageOrVideo from "../../components/forum/ImageOrVideo";
import TextEditor from "../../components/forum/TextEditor/TextEditor";
export default function InitialPost({ postData }) {
	return (
		<AuthComponent
			componentType="posts"
			unAuthorizedProcess={false}
			objectId={postData._id}
		>
			<section className="w-100 position-relative">
				<div className="w-100 d-flex">
					<div className="d-flex gap-2">
						<Avatar src={postData.createBy.profileImage} />
						<div className="h-auto">
							<p className="mb-0 text-primary-green-900 fw-bold">
								thread/{postData.threadName}
							</p>
							<p className="mb-0">{postData.createBy.username}</p>
						</div>
					</div>
					<DropDown />
				</div>

				<div className=" my-3 w-100">
					<h3>{postData.title}</h3>
					<div
						className="w-100 my-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
						style={{ height: "400px" }}
					>
						<ImageOrVideo
							src={postData.uploadFile}
							isPost={false}
						/>
					</div>
					<TextEditor content={postData.content} />
				</div>
				<div className="d-flex gap-3">
					<ButtonUpvote upvote={postData.upvote} />
				</div>
			</section>
		</AuthComponent>
	);
}
