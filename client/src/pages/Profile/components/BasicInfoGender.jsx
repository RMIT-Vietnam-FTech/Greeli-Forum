import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
	MdCheckCircle,
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const BasicInfoGender = (props) => {
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
		} else if (type === "description") {
			newBasicInfo = {
				...basicInfo,
				description: newInput,
			};
		}
		// console.log(newBasicInfo);
		updateBasicInfo(newBasicInfo);
	};

	// SET UP YUP FOR INPUT VALIDATION
	const infoSchema = Yup.object().shape({
		gender: Yup.string().required("Gender is required"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(infoSchema) });

	const handleInput = (event) => {
		setCurrentInput(event.target.value);
		// console.log(event);
	};

	const submitForm = (e) => {
		editInfoHandler(e);
		setIsEditing(false);
	};

	const onError = (errors) => {
		console.log("Form Errors:", errors);
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
					<div
						className="col-1 text-greeli-emphasis"
						aria-hidden="true"
					>
						{iconArray[id]}
					</div>
					{/* <label htmlFor={`info-input-${id}`} className="sr-only">
						Edit {type}
					</label> */}
					<form onSubmit={handleSubmit(submitForm, onError)}>
						<input
							type="text"
							id={`info-input-${id}`}
							{...register("gender")}
							className="col-9 px-2  text-greeli-emphasis border-input-change-pass"
							value={currentInput}
							onChange={handleInput}
							style={{
								borderRadius: "4px",
								backgroundColor: "transparent",
							}}
							aria-label={`Edit ${type}`}
						/>
						<button type="submit">
							<span>
								<MdCheckCircle />
							</span>
							{/* <MdCheckCircle
						role="button"
						type="submit"
						size={"28px"}
						tabIndex={0}
						className="col-2 text-greeli-emphasis"
						onClick={(e) => {
						}}
						aria-label="Save changes"
					/> */}
						</button>
					</form>
				</div>
				{errors.gender && (
					<p className="error text-start" tabIndex={0}>
						{errors.gender.message}
					</p>
				)}
			</div>
		);
	} else {
		return (
			<div className="container w-100 text-greeli-emphasis info-item">
				{/* <Toaster /> */}
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
							className="text-center col-2 btn btn-link p-0 text-decoration-none text-greeli-emphasis"
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

export default BasicInfoGender;
