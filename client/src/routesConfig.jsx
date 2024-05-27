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
import ProfileUpdate from "./pages/ProfileUpdate";
import GeneralPage from "./pages/generalPage/generalPage";
import Upload from "./pages/UploadImage/Upload.jsx";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
import ForumPage from "./pages/Forum/ForumPage/ForumPage.jsx";
import NewPassword from "./pages/Login/NewPassword.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Cookies from "./components/Cookies/Cookie.jsx";

const routesConfig = [
	{ path: "/", element: <Homepage />, name: "Homepage" },
	{ path: "/login", element: <Login />, name: "Login" },
	{ path: "/register", element: <Register />, name: "Register" },
	{ path: "/general", element: <GeneralPage />, name: "General" },
	{ path: "/contact", element: <ContactPage />, name: "Contact" },
	// { path: '/upload', element: <Upload />, name: 'Upload' },
	{ path: "/sitemap", element: <Sitemap />, name: "Sitemap" },
	{
		path: "/resetPassword",
		element: <ResetPassword />,
		name: "Reset Password",
	},
	{
		path: "/resetPassword/:token/:userId",
		element: <NewPassword />,
		name: "Create New Password",
	},
	{ path: "/admin", element: <AdminDashboard />, name: "Admin Dashboard" },
	{
		element: <RequireAuth />,
		children: [
			{
				element: <RequireActivate />,
				children: [
					{ path: "/profile", element: <Profile />, name: "Profile" },
					{ path: "/user/:userId", element: <Profile />, name: "User Profile" },
					{ path: "/chat", element: <Chat />, name: "Chat" },
				],
			},
		],
	},
	{ path: "/forum/*", element: <ForumPage />, name: "Forum" },
	{ path: "*", element: <ErrorPage />, name: "Error" },
];

export default routesConfig;
