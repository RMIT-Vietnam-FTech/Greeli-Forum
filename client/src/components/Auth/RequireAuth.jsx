import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PopupContext } from "../../context/PopupContext";
import { useUserContext } from "../../context/UserContext";
import SignIn from "../Popup/SignIn";
const RequireAuth = () => {
	const { user } = useUserContext();
	const location = useLocation();
	const userId = JSON.parse(user)?.id || null;
	const popupContext = useContext(PopupContext);
	console.log(userId);
	return userId ? (
		<Outlet />
	) : (
		// <Navigate to="/login" state={{ from: location }} replace />
		<SignIn isShow={true} />
	);
};
export default RequireAuth;
