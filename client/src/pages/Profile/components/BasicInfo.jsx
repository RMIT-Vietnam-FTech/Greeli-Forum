import { useState } from "react";
import toast from "react-hot-toast";
import {
	MdCheckCircle,
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";
import axios from "axios";

const BasicInfo = (props) => {
	const { id, type, basicInfo, updateBasicInfo, toaster } = props;
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
		<MdEmail size={"2vw"} />,
		<MdPhone size={"2vw"} />,
		<MdLocationOn size={"2vw"} />,
		<MdOutlineTransgender size={"2vw"} />,
	];
	if (isEditing) {
		return (
			<div className="container-fluid text-white info-item py-2">
				<div className="row d-flex flex-row items-align-center g-1">
					<div className="col-1">{iconArray[id]}</div>
					<input
						type="text"
						className="col-8 px-2"
						value={currentInput}
						onChange={handleInput}
						style={{
							border: "solid white 1px",
							borderRadius: "4px",
							backgroundColor:
								"transparent" /* Make input background transparent */,
							color: "white" /* Text color */,
						}}
					/>
					<MdCheckCircle
						size={"2vw"}
						className="col-2"
						onClick={(e) => {
							editInfoHandler(e);
							setIsEditing(false);
							toast.success("Info Updated");
						}}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container w-100 text-white info-item">
				<div className="row w-100">
					<div className="col-1">{iconArray[id]}</div>
					<p className={`col-9 `}>{displayInfo}</p>
					<p
						className="col-2"
						onClick={() => {
							setIsEditing(true);
						}}
					>
						Edit
					</p>
				</div>
			</div>
		);
	}
};

export default BasicInfo;

// CODE FOR CONDITIONAL FORMATTING
// ${
// 	displayInfo.substring(0, 14) === "Please update"
// 		? "font-italic font-weight-light"
// 		: "font-weight-normal"
// }
