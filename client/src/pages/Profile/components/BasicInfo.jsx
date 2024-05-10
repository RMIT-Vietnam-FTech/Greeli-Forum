import {
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";
import { useState } from "react";

const BasicInfo = (props) => {
	const [isEditing, setIsEditing] = useState(false);

	const editInfoHandler = (event) => {
		const newInput = event.target.value;
		props.setBasicInfo(preVal => {
			if (props.type === "email") {
				return {
					...preVal,
					email: newInput
				}
			} else if (props.type === "tel") {
				return {
					...preVal,
					tel: newInput
				}
			}
			else if (props.type === "address") {
				return {
					...preVal,
					address: newInput
				}
			}
			else if (props.type === "gender") {
				return {
					...preVal,
					gender: newInput
				}
			}
		}
		);

	}

	const iconArray = [
		<MdEmail />,
		<MdPhone />,
		<MdLocationOn />,
		<MdOutlineTransgender />,
	];
	if (isEditing) {
		return (
			<div className="container w-100 text-white info-item">
				<div className="row">
					<div className="col-1">{iconArray[props.id]}</div>
					<input
						type="text"
						className="col-9"
						value={props.basicInfo[props.type]}
						onChange={editInfoHandler}
					/>
					<button
						className="col-2"
						onClick={() => { setIsEditing(false); }}
					>
						Save
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container w-100 text-white info-item">
				<div className="row">
					<div className="col-1">{iconArray[props.id]}</div>
					<p className="col-9">{props.basicInfo[props.type]}</p>
					<p className="col-2" onClick={() => { setIsEditing(true) }}>Edit</p>
				</div>
			</div>
		);
	}
};

export default BasicInfo;
