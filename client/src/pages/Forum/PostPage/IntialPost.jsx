import Avatar from "../../../components/forum/Avatar";
import DropDown from "../../../components/forum/DropDown";
import EditTextEditor from "../../../components/forum/EditTextEditor/EditTextEditor";
import ImageOrVideo from "../../../components/forum/ImageOrVideo";
import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
import { useNavigate } from "react-router-dom";
export default function InitialPost({ postData }) {
	const navigate = useNavigate();

	const handleUserProfileRedirect = () => {
		navigate(`/user/${postData.createdBy.userId}`, { root: true });
	};

	return (
		<section className="w-100 position-relative">
			<EditContextProvider>
				<div className="w-100 d-flex">
					{/*post header*/}
					<div className="d-flex gap-2" onClick={handleUserProfileRedirect}>
						<Avatar src={postData.createdBy.profileImage} />
						<div className="h-auto ">
							<p className="mb-0 text-general-emphasis">
								{postData.createdBy.username}
							</p>
						</div>
					</div>
					<AuthorizationContextProvider
						componentType="post"
						objectId={postData._id}
					>
						<DropDown
							componentType="post"
							postId={postData._id}
							threadId={postData.belongToThread}
						/>
					</AuthorizationContextProvider>
				</div>
				{/*post body*/}
				<div className=" mt-3 w-100">
					<div
						className="fs-4 fw-bold text-forum-emphasis"
						style={{ wordBreak: "break-word" }}
					>
						{postData.title}
					</div>

					{postData.uploadFile ? (
						<div
							className="w-100 my-4 bg-forum-subtle rounded-3 d-flex justify-content-center overflow-hidden"
							style={{ height: "400px" }}
						>
							<ImageOrVideo src={postData.uploadFile} isPost={false} />
						</div>
					) : null}
					<EditTextEditor
						componentType="post"
						content={JSON.parse(postData.content)}
					/>
				</div>
			</EditContextProvider>
		</section>
	);
}
