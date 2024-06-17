import React, { lazy, Suspense } from "react";
import RequireActivate from "./components/Auth/RequireActivate.jsx";
import RequireAdmin from "./components/Auth/RequireAdmin.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import LoadSpinner from "./pages/LoadSpinner/LoadSpinner.jsx";

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Login/Register'));
const NewPassword = React.lazy(() => import('./pages/Login/NewPassword.jsx'));
const ResetPassword = React.lazy(() => import('./pages/Login/ResetPassword.jsx'));
const ProfilePage = React.lazy(() => import('./pages/ProfileUpdate'));
const ChatPage = React.lazy(() => import('./pages/Chat/Chat'));
const ContactPage = React.lazy(() => import('./pages/ContactPage/Contact.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage/ErrorPage'));
const ForumPage = React.lazy(() => import('./pages/Forum/ForumPage/ForumPage.jsx'));
const Sitemap = React.lazy(() => import('./pages/Sitemap/Sitemap.jsx'));
const GeneralPage = React.lazy(() => import('./pages/generalPage/generalPage'));

const routesConfig = [
	{ path: "/", element: <Homepage />, name: "Homepage" },
	{ path: "/login", element: <Suspense fallback={<LoadSpinner />}><Login /></Suspense>, name: "Login" },
	{ path: "/register", element: <Suspense fallback={<LoadSpinner />}><Register /></Suspense>, name: "Register" },
	{ path: "/general", element: <Suspense fallback={<LoadSpinner />}><GeneralPage /></Suspense>, name: "General" },
	{ path: "/contact", element: <Suspense fallback={<LoadSpinner />}><ContactPage /></Suspense>, name: "Contact" },
	{ path: "/sitemap", element: <Suspense fallback={<LoadSpinner />}><Sitemap /></Suspense>, name: "Sitemap" },
	{
		path: "/resetPassword",
		element: <Suspense fallback={<LoadSpinner />}><ResetPassword /></Suspense>,
		name: "Reset Password",
	},
	{
		path: "/resetPassword/:token/:userId",
		element: <Suspense fallback={<LoadSpinner />}><NewPassword /></Suspense>,
		name: "Create New Password",
	},
	{
		element: <RequireAuth />,
		children: [
			{
				element: <RequireActivate />,
				children: [
					{
						path: "/profile",
						element: <Suspense fallback={<LoadSpinner />}><Register /></Suspense>,
						name: "Profile",
					},
					{
						path: "/user/:userId",
						element: <Suspense fallback={<LoadSpinner />}><ProfilePage /></Suspense>,
						name: "User Profile",
					},
					{ path: "/chat", element: <Suspense fallback={<LoadSpinner />}><ChatPage /></Suspense>, name: "Chat" },
					{
						element: <RequireAdmin />,
						children: [
							{
								path: "/admin",
								element: <Suspense fallback={<LoadSpinner />}><Dashboard /></Suspense>,
								name: "Admin Dashboard",
							},
						],
					},
				],
			},
		],
	},
	{ path: "/forum/*", element: <Suspense fallback={<LoadSpinner />}><ForumPage /></Suspense>, name: "Forum" },
	{ path: "*", element: <Suspense fallback={<LoadSpinner />}><ErrorPage /></Suspense>, name: "Error" },
];

export default routesConfig;
