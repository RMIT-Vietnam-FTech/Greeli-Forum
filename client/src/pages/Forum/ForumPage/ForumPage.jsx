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
import ErrorPage from "../../ErrorPage/ErrorPage";
import PostList from "../ThreadPage/PostList";
import TopicPage from "../TopicPage";
export default function ForumPage() {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<main
			className=" bg-greeli-subtle"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
			<PopupContextProvider>
				<section className="search-container d-flex justify-content-center w-100"></section>

				<section className="container-wrapper">
					<section className="left-sidebar">
						<LeftSideBar />
					</section>
					<section className="main-container">
						<section className="main">
							<SearchBar />
							<Routes path="/">
								<Route index element={<PostList />} />
								{/* <Route path="*" element={<ErrorPage />} /> */}
								<Route path="topics/:topicId">
									<Route index element={<TopicPage />} />
								</Route>
								<Route path="communities/:threadId">
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
								<Route
									path="*"
									element={<RightSideBarForum />}
								/>
								<Route
									path="/communities/:threadId"
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
