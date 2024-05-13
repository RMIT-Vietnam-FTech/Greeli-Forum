import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const RequireAuth = () => {
	const { user } = useUserContext();
	const location = useLocation();

	return user?.userId ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};
export default RequireAuth;
