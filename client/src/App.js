import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import RequireActivate from "./components/Auth/RequireActivate.jsx";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import ChatBubble from "./components/ChatBubble/ChatBubble.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import Chat from "./pages/Chat/Chat";
import ContactPage from "./pages/ContactPage/Contact.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Profile from "./pages/Profile/Profile";
import GeneralPage from "./pages/generalPage/generalPage";
import Upload from "./pages/UploadImage/Upload.jsx";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
import ForumPage from "./pages/Forum/ForumPage/ForumPage.jsx";
import CookiesConsent from "react-cookie-consent";
// import { useUserContext } from "./context/UserContext.jsx";
function App() {
	let location = useLocation();
	const [isForum, setIsForum] = useState(false);
	// const { user } = useUserContext();
	// const isActivated = JSON.parse(user)?.isActivated;
	useEffect(() => {
		console.log(
			`check location pathname: ${location.pathname}\n check isForum: ${isForum}`,
		);
		if (location.pathname.split("/")[1] == "forum") {
			setIsForum(true);
		} else {
			setIsForum(false);
		}
	}, [location.pathname]);

	return (
    <div className="App w-100">
      <ThemeProvider>
        <UserContextProvider>
          <Navbar isForum={isForum} />
          <div className="h-100" style={{ marginTop: "80px" }}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/general" element={<GeneralPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route element={<RequireAuth />}>
                <Route element={<RequireActivate />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/user/:userId" element={<Profile />} />
                  <Route path="/chat" element={<Chat />} />
                </Route>
              </Route>
              <Route path="/forum/*" element={<ForumPage/>}></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
          <ChatBubble />
          <div id="popup-root"></div>
          <CookiesConsent
            debug={true}
            location="bottom"
            buttonText="Accept all cookies"
            style={{ background: "#2B373B" }}
            buttonClasses="bg-primary-green text-light rounded-4 m-2 py-2 px-3"
            overlay={true}
            containerClasses="text-start bg-primary-yellow-300 rounded-4 m-2 p-2 w-25"
            contentClasses="text-primary-green d-block h-auto m-2"
          >
            <img
              className="m-2 d-block"
              src="LightLogo.svg"
              width={60}
              alt="Greeli Logo"
            />
            By clicking “Accept all cookies”, you agree Greeli can store cookies
            on your device and disclose information in accordance with our
            Cookie Policy.
          </CookiesConsent>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
