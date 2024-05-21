import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { MdEmail, MdFacebook, MdPhone } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext";
import "./style.css";

const ErrorPage = () => {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<div
			className="errorpage-container bg-greeli-subtle text-error-emphasis d-flex flex-column justify-content-center align-items-center"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<div className="error-wrapper text-center text-primary-green">
				<h1 className="text-error-emphasis error-code p-0 m-0">404</h1>
				<p className="text-error-emphasis error-page-message text-uppercase my-3">
					We are sorry but the page you requested was not found
				</p>
				<div className="d-flex flex-row gap-3 justify-content-center">
					<Button className="error-button rounded-pill">GO HOME</Button>{" "}
					<Button
						className="text-error-emphasis error-button rounded-pill border-error"
						variant="outline-primary-green"
					>
						CONTACT US
					</Button>
				</div>
				<div className="d-flex flex-row gap-3 justify-content-center icons-container mt-3 mx-auto text-error-emphasis">
					<MdEmail size={"100%"} className="error-contact-icon" />
					<MdFacebook size={"100%"} className="error-contact-icon" />
					<MdPhone size={"100%"} className="error-contact-icon" />
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
