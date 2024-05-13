import { useState } from "react";

import ImageOrVideo from "../../../components/forum/ImageOrVideo";

import Button from "react-bootstrap/Button";
import DropDown from "../../../components/forum/DropDown";
import EditTextEditor from "../../../components/forum/EditTextEditor/EditTextEditor";

import { AuthorizationContextProvider } from "../../../context/AuthorizationContext";
import { EditContextProvider } from "../../../context/EditContext";
import NewPostPopUp from "./components/NewPostPopUp";
export default function ThreadHeader({ ...prop }) {
	const { title, uploadFile, content, objectId } = prop;
	const [isOpen, setIsOpen] = useState(false);
	console.log("openstatus: " + isOpen);
	return (
		<>
			<section className="w-100">
				<EditContextProvider>
					<div className="d-flex position-relative">
						<h1 className="title text-primary-green-900">
							{title}
						</h1>
						<Button className="ms-3 px-4 btn-primary-green-600 text-white">
							follow thread
						</Button>

						<AuthorizationContextProvider
							componentType="thread"
							objectId={objectId}
						>
							<DropDown componentType="thread" />
						</AuthorizationContextProvider>
					</div>

					{uploadFile ? (
						<div
							className="w-100 mt-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
							style={{ height: "400px" }}
						>
							<ImageOrVideo src={uploadFile} isPost={false} />
						</div>
					) : null}

					<div className="w-100 mt-3">
						<EditTextEditor
							componentType="post"
							content={content}
						/>
					</div>
				</EditContextProvider>
				<Button
					onClick={() => {
						setIsOpen(true);
					}}
					className="w-100 bg-transparent border-primary-green-900 text-primary-green-900 rounded-5 text-start"
				>
					Create Post +
				</Button>
				<NewPostPopUp
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					parentThread={title}
				/>
			</section>
		</>
	);
}
