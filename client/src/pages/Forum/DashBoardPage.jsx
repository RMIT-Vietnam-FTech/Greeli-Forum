import { Outlet } from "react-router-dom";
import AuthLeftSideBar from "../../components/forum/AuthLeftSideBar";
import LeftSideBar from "../../components/forum/EditTextEditor/LeftSideBar";
export default function DashBoardPage() {
	return (
		<>
			<section className="container">
				<section className="left-sidebar">
					{localStorage.getItem("user") ? (
						<AuthLeftSideBar />
					) : (
						<LeftSideBar />
					)}
				</section>
				<section className="main-container">
					<section className="main">
						
					</section>
					<section className="right-sidebar"></section>
				</section>
			</section>
		</>
	);
}
