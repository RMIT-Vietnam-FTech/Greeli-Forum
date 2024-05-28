import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PopupContext } from "../../context/PopupContext";
import { useUserContext } from "../../context/UserContext";
import SignIn from "../Popup/SignIn";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
const RequireAdmin = () => {
	const { user } = useUserContext();
	const location = useLocation();
	const userRole = JSON.parse(user)?.role || null;
	console.log(userRole);
	return userRole === "admin" ? (
		<Outlet />
	) : (
		// <Navigate to="/login" state={{ from: location }} replace />
		<ErrorPage />
	);
};
export default RequireAdmin;
