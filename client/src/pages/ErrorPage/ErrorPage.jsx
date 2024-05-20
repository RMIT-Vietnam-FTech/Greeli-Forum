import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { MdEmail, MdFacebook, MdPhone } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext";
import "./style.css";
import PreventionPopup from "../../components/Popup/PreventionPopup";

const ErrorPage = () => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<div
			className="errorpage-container bg-greeli-subtle d-flex flex-column justify-content-center align-items-center"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="error-wrapper text-center text-primary-green">
				<h1 className="text-error-emphasis">404</h1>
				<p className="text-uppercase fw-medium text-error-emphasis">
					We are sorry but the page you requested was not found
				</p>
				<div>
					<Button className="error-button rounded-pill">
						GO HOME
					</Button>{" "}
					<Button
						className="error-button rounded-pill border-error text-login-emphasis"
						variant="outline-primary-green"
					>
						CONTACT US
					</Button>
				</div>
				<div className="d-flex flex-row justify-content-center icons-container mt-3 text-error-emphasis">
					<MdEmail size={"3vw"} />
					<MdFacebook size={"3vw"} />
					<MdPhone size={"3vw"} />
				</div>
			</div>
			<PreventionPopup />
			<div id="popup-root"></div>
		</div>
	);
};

export default ErrorPage;
