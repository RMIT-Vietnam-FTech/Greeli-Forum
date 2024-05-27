import { Route, Routes } from "react-router-dom";

import LeftSideBar from "../../../components/Forum/LeftSideBar/LeftSideBar";
import RightSideBarForum from "../../../components/Forum/RightSideBar/RightSideBarForum";
import RightSideBarThread from "../../../components/Forum/RightSideBar/RightSideBarThread";

import SearchBar from "../../../components/Search/Search";
import PostPage from "../PostPage/PostPage";
import ThreadPage from "../ThreadPage/ThreadPage";

import { useContext } from "react";
import LoginPopup from "../../../components/Popup/LoginPopup";
import { PopupContextProvider } from "../../../context/PopupContext";
import { ThemeContext } from "../../../context/ThemeContext";
import PostList from "../ThreadPage/PostList";

export default function ForumPage() {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<main
			className=" bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<PopupContextProvider>
				<section className="search-container d-flex justify-content-center w-100">
					<SearchBar />
				</section>
				<section className="container-wrapper">
					<section className="left-sidebar">
						<LeftSideBar />
					</section>
					<section className="main-container">
						<section className="main">
							<Routes path="/">
								<Route index element={<PostList />} />
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
