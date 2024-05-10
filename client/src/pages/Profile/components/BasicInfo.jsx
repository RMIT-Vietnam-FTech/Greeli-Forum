import { MdEmail, MdPhone, MdLocationOn, MdOutlineTransgender } from "react-icons/md";

const BasicInfo = (props) => {
  const iconArray = [<MdEmail />, <MdPhone />, <MdLocationOn />, <MdOutlineTransgender />];
  return (
    <div className="container w-100 text-white info-item">
      <div className="row">
        <div className="col-1">{iconArray[props.id]}</div>
        <p className="col-9">{props.info}</p>
        <p className="col-2">Edit</p>
      </div>
    </div>
  );
}

export default BasicInfo;