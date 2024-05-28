import React from "react";
import CookiesConsent from "react-cookie-consent";
import "../../scss/custom.css";
import "./Cookies.css";

const Cookies = () => {
	return (
		<CookiesConsent
			location="bottom"
			style={{
				position: "fixed",
			}}
			flipButtons={true}
			overlay={true}
			enableDeclineButton={true}
			buttonText="Accept all cookies"
			ariaAcceptLabel="Accept cookies"
			declineButtonText="Necessary cookies only"
			ariaDeclineLabel="Necessary cookies only"
			buttonClasses="cookie-btn bg-primary-green p-2 m-0 w-100 text-white border border-2 border-primary-green rounded-3"
			declineButtonClasses="cookie-btn bg-transparent p-2 m-0 w-100 text-primary-green border border-2 border-primary-green rounded-3"
			containerClasses="bg-primary-yellow-300 h-auto p-3"
			buttonWrapperClasses="cookie-btn-container"
		>
			<div className="cookies-content">
				<img
					className="mb-3 d-block"
					src="LightLogo.svg"
					width={60}
					alt="Greeli Logo"
				/>
				<p className="text-primary-green d-block m-0">
					We use cookies to improve your browsing experience on our
					website. These cookies store information about your
					preferences and help us analyze website traffic. By
					continuing to use our site, you consent to our use of
					cookies. To learn more about the cookies we use and how to
					manage your preferences, please visit our Cookie Policy.
				</p>
			</div>
		</CookiesConsent>
	);
};

export default Cookies;
