import { Route, Routes } from "react-router-dom";

import LeftSideBar from "../../components/forum/LeftSideBar";
import RightSideBarThread from "../../components/forum/RightSideBarThread";
import RightSideBarForum from "../../components/forum/RightSideBarForum";
import SearchBar from "../../components/Search/Search";
import ThreadPage from "./ThreadPage/ThreadPage";
import DashBoardPage from "./DashBoardPage";
import PostPage from "./PostPage/PostPage";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { PopupContextProvider } from "../../context/PopupContext";
import LoginPopup from "../../components/Popup/LoginPopup";

export function ForumRouter() {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<main
			className=" bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<PopupContextProvider>
				<section className="search-container d-flex justify-content-center w-100 pt-5">
					<SearchBar />
				</section>
				<section className="container-wrapper">
					<section className="left-sidebar bg-forum-subtle">
						<LeftSideBar />
					</section>
					<section className="main-container">
						<section className="main">
							<Routes path="/">
								<Route index element={<DashBoardPage />} />
								<Route path="threads/:threadId">
									<Route index element={<ThreadPage />} />
									<Route
										path="posts/:postId"
										element={<PostPage />}
									/>
								</Route>
							</Routes>
						</section>
						<section className="right-sidebar">
							<Routes path="/">
								<Route index element={<RightSideBarForum />} />
								<Route
									path="/threads/:threadId"
									element={<RightSideBarThread />}
								>
									<Route
										path="posts/:postId"
										element={<RightSideBarThread />}
									/>
								</Route>
							</Routes>
						</section>
					</section>
				</section>
				<LoginPopup isShow={false} />
			</PopupContextProvider>
		</main>
	);
}
