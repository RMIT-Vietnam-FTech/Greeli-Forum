import { useState } from "react";
import toast from "react-hot-toast";
import {
	MdCheckCircle,
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";

const BasicInfo = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	const editInfoHandler = (event) => {
		const newInput = event.target.value;
		props.setBasicInfo((preVal) => {
			if (props.type === "email") {
				return {
					...preVal,
					email: newInput,
				};
			} else if (props.type === "tel") {
				return {
					...preVal,
					tel: newInput,
				};
			} else if (props.type === "address") {
				return {
					...preVal,
					address: newInput,
				};
			} else if (props.type === "gender") {
				return {
					...preVal,
					gender: newInput,
				};
			}
		});
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
					<div className="col-1">{iconArray[props.id]}</div>
					<input
						type="text"
						className="col-8 px-2"
						value={props.basicInfo[props.type]}
						onChange={editInfoHandler}
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
						onClick={() => {
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
					<div className="col-1">{iconArray[props.id]}</div>
					<p className="col-9">{props.basicInfo[props.type]}</p>
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
