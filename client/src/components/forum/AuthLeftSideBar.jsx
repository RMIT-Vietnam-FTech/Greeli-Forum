import { useState } from "react";
import { Button } from "react-bootstrap";
import { IoIosArrowUp } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import NewThreadPopUp from "../../pages/Forum/ThreadPage/components/NewThreadPopUp";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function AuthLeftSideBar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section
			className="d-flex px-4 flex-column w-100 bg-primary-green rounded-3"
			style={{ height: "80vh" }}
		>
			<a
				className="w-100 d-flex justify-content-between align-items-center  text-primary-yellow"
				data-bs-toggle="collapse"
				href="#collapseExample"
				role="button"
				aria-expanded="false"
				aria-controls="collapseExample"
			>
				<a>Custom Threads</a>
				<p>
					<IoIosArrowUp />
				</p>
			</a>
			<div className="collapse" id="collapseExample">
				<div
					onClick={() => {
						setIsOpen(true);
					}}
					className="w-100 d-flex justify-content-between text-white cursor-pointer"
				>
					<p>Create Threads </p>
					<p>
						<IoAdd />
					</p>
				</div>

			</div>
			<NewThreadPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
		</section>
	);
}

function CreatedThread(){
const { data, error, isLoading } = useSwr(
		`http://localhost:9000/api/v1/threads?createdBy=${JSON.parse(localStorage.getItem("user")).id}`,
		fetcher,
	);
	if (error) {
		return <div>is error</div>;
	}
	if (isLoading) {
		return <div>is loading</div>;
	}
}