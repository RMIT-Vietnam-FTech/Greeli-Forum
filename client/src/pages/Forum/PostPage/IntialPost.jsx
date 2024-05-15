import Avatar from "../../../components/forum/Avatar";
import ButtonUpvote from "../../../components/forum/ButtonUpvote";
import DropDown from "../../../components/forum/DropDown";
import EditTextEditor from "../../../components/forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/forum/ImageOrVideo";
import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
export default function InitialPost({ postData }) {
	return (
		<section className="w-100 position-relative">
			<EditContextProvider>
				<div className="w-100 d-flex">
					<div className="d-flex gap-2">
						<Avatar src={postData.createdBy.profileImage} />
						<div className="h-auto">
							<p className="mb-0 text-primary-green-900 fw-bold">
								thread/{postData.threadName}
							</p>
							<p className="mb-0">
								{postData.createdBy.username}
							</p>
						</div>
					</div>
					<AuthorizationContextProvider
						componentType="post"
						objectId={postData._id}
					>
						<DropDown componentType="post" postId={postData._id} threadId={postData.belongToThread} />
					</AuthorizationContextProvider>
				</div>

				<div className=" my-3 w-100">
					<h3>{postData.title}</h3>

					{postData.uploadFile ? (
						<div
							className="w-100 my-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
							style={{ height: "400px" }}
						>
							<ImageOrVideo
								src={postData.uploadFile}
								isPost={false}
							/>
						</div>
					) : null}
					<EditTextEditor componentType="post" content={JSON.parse(postData.content)} />
				</div>
			</EditContextProvider>
		</section>
	);
}
