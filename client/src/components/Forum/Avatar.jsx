import { TbBorderRadius } from "react-icons/tb";

export default function Avatar({ src, username, size }) {
  let isNull;
  if (!src) {
    isNull = true;
  } else {
    isNull = false;
  }
  const style = {
	width:"40px",
	height:"40px"
  };
  if(size==="sm"){
	style.width="20px";
	style.height= "20px"
  }
  if(size==="lg"){
	style.width="60px";
	style.height= "60px"
  }
  return (
    <div
      tabIndex={0}
      aria-label="avatar image"
      className="avatar"
      style={style}
    >
      {isNull ? null : <img alt={username} src={src} className="w-100 h-100" />}
    </div>
  );
}