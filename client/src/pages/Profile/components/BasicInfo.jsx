import { useState } from "react";
import toast from "react-hot-toast";
import {
	MdCheckCircle,
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const BasicInfo = (props) => {
	const { id, type, basicInfo, updateBasicInfo, toaster, isMe } = props;
	const displayInfo = basicInfo[type];
	const [isEditing, setIsEditing] = useState(false);
	const [currentInput, setCurrentInput] = useState("");

	const editInfoHandler = (event) => {
		const newInput = currentInput;
		var newBasicInfo;
		if (type === "email") {
			newBasicInfo = {
				...basicInfo,
				email: newInput,
			};
		} else if (type === "tel") {
			newBasicInfo = {
				...basicInfo,
				tel: newInput,
			};
		} else if (type === "address") {
			newBasicInfo = {
				...basicInfo,
				address: newInput,
			};
		} else if (type === "gender") {
			newBasicInfo = {
				...basicInfo,
				gender: newInput,
			};
		}
		// console.log(newBasicInfo);
		updateBasicInfo(newBasicInfo);
	};

	const handleInput = (event) => {
		setCurrentInput(event.target.value);
		// console.log(event);
	};

	const iconArray = [
		[<RiDoubleQuotesL size={"28px"} />, <RiDoubleQuotesR size={"28px"} />],
		<MdEmail size={"28px"} />,
		<MdPhone size={"28px"} />,
		<MdLocationOn size={"28px"} />,
		<MdOutlineTransgender size={"28px"} />,
	];

	if (isEditing) {
		return (
			<div className="container-fluid text-white info-item py-2">
				<div className="row d-flex flex-row align-items-center g-1">
					<div className="col-1" aria-hidden="true">
						{iconArray[id]}
					</div>
					{/* <label htmlFor={`info-input-${id}`} className="sr-only">
						Edit {type}
					</label> */}
					<input
						type="text"
						id={`info-input-${id}`}
						className="col-8 px-2"
						value={currentInput}
						onChange={handleInput}
						style={{
							border: "solid white 1px",
							borderRadius: "4px",
							backgroundColor: "transparent",
							color: "white",
						}}
						aria-label={`Edit ${type}`}
					/>
					<MdCheckCircle
						size={"2vw"}
						className="col-2"
						onClick={(e) => {
							editInfoHandler(e);
							setIsEditing(false);
							toast.success("Info Updated");
						}}
						role="button"
						aria-label="Save changes"
						tabIndex={0}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container w-100 text-white info-item">
				<div className="row w-100">
					<div className="col-1" aria-hidden="true">
						{id === 0 ? iconArray[id][0] : iconArray[id]}
					</div>
					<p
						className={`${isMe ? "col-9" : "col-11"} ${
							id === 0 ? "font-italic" : ""
						}`}
						onClick={() => {
							console.log(id);
						}}
						tabIndex={0}
						role="textbox"
						aria-readonly="true"
					>
						{displayInfo} {id === 0 ? iconArray[id][1] : null}
					</p>
					{isMe && (
						<button
							className="col-2 btn btn-link p-0 text-decoration-none text-white"
							onClick={() => {
								setIsEditing(true);
							}}
							aria-label={`Edit ${type}`}
						>
							Edit
						</button>
					)}
				</div>
			</div>
		);
	}
};

export default BasicInfo;
