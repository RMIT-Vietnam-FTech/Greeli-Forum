import RequireActivate from "./components/Auth/RequireActivate.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat/Chat";
import ContactPage from "./pages/ContactPage/Contact.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ForumPage from "./pages/Forum/ForumPage/ForumPage.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Login from "./pages/Login/Login";
import NewPassword from "./pages/Login/NewPassword.jsx";
import Register from "./pages/Login/Register";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import Profile from "./pages/Profile/Profile";
import Sitemap from "./pages/Sitemap/Sitemap.jsx";
import ProfileUpdate from "./pages/ProfileUpdate";
import GeneralPage from "./pages/generalPage/generalPage";
import RequireAdmin from "./components/Auth/RequireAdmin.jsx";

const routesConfig = [
	{ path: "/", element: <Homepage />, name: "Homepage" },
	{ path: "/login", element: <Login />, name: "Login" },
	{ path: "/register", element: <Register />, name: "Register" },
	{ path: "/general", element: <GeneralPage />, name: "General" },
	{ path: "/contact", element: <ContactPage />, name: "Contact" },
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
	{
		element: <RequireAuth />,
		children: [
			{
				element: <RequireActivate />,
				children: [
					{ path: "/profile", element: <ProfileUpdate />, name: "Profile" },
					{
						path: "/user/:userId",
						element: <ProfileUpdate />,
						name: "User Profile",
					},
					{ path: "/chat", element: <Chat />, name: "Chat" },
					{
						element: <RequireAdmin />,
						children: [
							{
								path: "/admin",
								element: <Dashboard />,
								name: "Admin Dashboard",
							},
						],
					},
				],
			},
		],
	},
	{ path: "/forum/*", element: <ForumPage />, name: "Forum" },
	{ path: "*", element: <ErrorPage />, name: "Error" },
];

export default routesConfig;
