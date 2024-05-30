import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import LoginPopup from "../Popup/LoginPopup";
import PreventionPopup from "../Popup/PreventionPopup";
axios.defaults.withCredentials = true;

const RequireActivate = () => {
	const { user } = useUserContext();
	const userData = JSON.parse(localStorage.getItem("user"));
	const userActivated = JSON.parse(user)?.isActivated || null;
	const userId = JSON.parse(user)?.id || null;
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	console.log(userActivated);

	const activateAccount = () => {
		const configuration = {
			method: "post",
			url: `http://localhost:3001/api/user/${userId}/activate`,
		};
		axios(configuration)
			.then((result) => {
				console.log(result.data);
				// navigate(<Outlet />, { replace: true });
				userData.isActivated = true;
				localStorage.setItem("user", JSON.stringify(userData));
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("Account activated");
	};

	return userActivated ? (
		<Outlet />
	) : (
		// <Navigate to="/login" state={{ from: location }} replace />
		<div className="h-100 text-center m-5">
			<h2 className="" style={{ marginBottom: "-40px", marginTop: "100px" }}>
				Your account is deactivated, click the button to activate it
			</h2>
			<PreventionPopup
				modalTitle="Reactivate your account to continue"
				buttonValue="Activate"
				action="Activate"
				buttonStyle="bg-success text-white rounded-pill mt-5 py-2"
				ariaLabel="Deactivate account"
				actionFunction={activateAccount}
			/>
		</div>
	);
};
export default RequireActivate;
