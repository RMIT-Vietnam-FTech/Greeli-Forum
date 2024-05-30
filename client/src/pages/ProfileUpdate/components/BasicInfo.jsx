import {
	MdEmail,
	MdLocationOn,
	MdOutlineTransgender,
	MdPhone,
} from "react-icons/md";

const BasicInfo = (props) => {
	const { id, displayInfo } = props;
	const iconArray = [
		<MdEmail size={"2vw"} className="info-icon" />,
		<MdPhone size={"2vw"} className="info-icon" />,
		<MdLocationOn size={"2vw"} className="info-icon" />,
		<MdOutlineTransgender size={"2vw"} className="info-icon" />,
	];
	return (
		<div className="container w-100 text-greeli-emphasis info-item">
			<div className="row w-100">
				<div className="col-2" aria-hidden="true">
					{iconArray[id]}
				</div>
				<p
					className={`col-10 ${
						displayInfo === null ? "text-gray" : ""
					}`}
					tabIndex={0}
					role="textbox"
					aria-readonly="true"
				>
					{displayInfo === null
						? "Please update your info"
						: displayInfo}
				</p>
			</div>
		</div>
	);
};

export default BasicInfo;
