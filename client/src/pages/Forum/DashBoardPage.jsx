import { Outlet } from "react-router-dom";
import AuthLeftSideBar from "../../components/forum/AuthLeftSideBar";
import LeftSideBar from "../../components/forum/EditTextEditor/LeftSideBar";
import Cookies from "universal-cookie";
export default function DashBoardPage() {
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const [error, setError] = useState("");
	return (
		<>
			<section className="container">
				<section className="left-sidebar">
					{token ? (
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
