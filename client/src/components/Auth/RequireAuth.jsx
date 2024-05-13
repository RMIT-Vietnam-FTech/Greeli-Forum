import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import LoginPopup from "../Popup/LoginPopup";
const RequireAuth = () => {
	const { user } = useUserContext();
	const location = useLocation();
	const userId = JSON.parse(user)?.id || null;
	console.log(userId);
	return userId ? (
		<Outlet />
	) : (
		// <Navigate to="/login" state={{ from: location }} replace />
		<LoginPopup isShow={true} />
	);
};
export default RequireAuth;
