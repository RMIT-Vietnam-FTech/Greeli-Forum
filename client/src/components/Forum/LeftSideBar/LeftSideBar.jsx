import axios from "axios";
import { useContext, useState, useEffect } from "react";
import useSwr from "swr";

import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import { NavLink } from "react-router-dom";
import NewPostPopUp from "../../../pages/Forum/ThreadPage/components/NewCommunityPopup";
import NewCommunityPopUp from "../../../pages/Forum/ThreadPage/components/NewCommunityPopup";
import NewThreadPopUp from "../../../pages/Forum/ThreadPage/components/NewThreadPopUp";

axios.defaults.withCredentials = true;
{
	/*---------------------fetching function ----------------------*/
}
const fetcher = (url) => axios.get(url).then((res) => res.data);
const validatedFetcher = (url) => {
	return axios.get(url).then((res) => res.data);
};
{
	/*--------------------default style  -------------------------*/
}

const listHeadingStyle =
	" hover-style w-100 bg-transparent d-flex justify-content-between text-primary-yellow border-0 p-2 left-sidebar-item ";

const listItemStyle =
	"hover-style w-100 d-flex justify-content-between align-items-center  text-greeli-emphasis border-0 p-2 left-sidebar-item ";
const nestedListItemStyle =
	"d-block p-2 text-greeli-emphasis left-sidebar-item hover-style";

export default function LeftSideBar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section
			className="w-100 d-flex flex-column px-2 pb-3 overflow-scroll-y"
			style={{ height: "88%" }}
		>
			<CommunityList>
				<button
					className="w-100 my-2 bg-primary-yellow hover-style-yellow text-dark py-1 rounded-2 border-0"
					style={{ borderWidth: "0.5px" }}
					onClick={() => {
						setIsOpen(true);
					}}
				>
					Create Community
					<IoAdd />
				</button>
				<YourCommunity />
				<FollowingCommunity />
			</CommunityList>

			<TopicWrapper>
				<TopicList />
			</TopicWrapper>
			<NewCommunityPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
		</section>
	);
}
function CommunityList({ children }) {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		JSON.parse(localStorage.getItem("user")) && (
			<>
				<section className=" w-100 py-2 border-bottom-gray">
					{/*collapse header*/}
					<button
						onClick={() => {
							setIsExpanded(!isExpanded);
						}}
						className={listHeadingStyle}
						data-bs-toggle="collapse"
						href="#collapse-community"
						role="button"
						aria-expanded="false"
						aria-controls="collapseExample"
					>
						<p className="m-0 p-0">Community</p>
						<p
							style={
								!isExpanded
									? { transform: "rotate(180deg)" }
									: {}
							}
							className="m-0 p-0"
						>
							<IoIosArrowDown />
						</p>
					</button>

					{/*collapse body*/}
					<div className="collapse show" id="collapse-community">
						{children}
					</div>
				</section>
			</>
		)
	);
}

function YourCommunity() {
	const [isExpanded, setIsExpanded] = useState(false);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	const path =
		baseUrl +
		`/api/user/${
			JSON.parse(localStorage.getItem("user")).id
		}/created_threads`;

	const { data, error, isLoading } = useSwr(path, validatedFetcher);
	if (error) {
		return <></>;
	}
	if (isLoading) {
		return <></>;
	}
	return (
		<>
			{/*collapse header*/}
			<button
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
				className={listItemStyle + " hover-style"}
				data-bs-toggle="collapse"
				href="#collapse-created-thread"
				role="button"
				aria-expanded="false"
				aria-controls="collapseExample"
			>
				<p className="m-0 p-0">Your Community</p>

				<p
					style={isExpanded ? { transform: "rotate(180deg)" } : {}}
					className="m-0 p-0"
				>
					<IoIosArrowDown />
				</p>
			</button>

			{/*collapse body*/}
			<div
				className="ms-3  collapse border-left-gray"
				id="collapse-created-thread"
			>
				<div className="w-100 d-flex flex-column justify-content-between ">
					{data.map((thread) => {
						return (
							<a
								key={thread._id}
								href={`/forum/communities/${thread._id}`}
								className={nestedListItemStyle}
							>
								{thread.title}
							</a>
						);
					})}
				</div>
			</div>
		</>
	);
}
function FollowingCommunity() {
	const [isExpanded, setIsExpanded] = useState(false);
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);

	const path =
		baseUrl +
		`/api/user/${
			JSON.parse(localStorage.getItem("user")).id
		}/follow_threads`;

	const { data, error, isLoading } = useSwr(path, validatedFetcher);
	if (error) {
		return <></>;
	}
	if (isLoading) {
		return <></>;
	}

	return (
		<>
			{/*collapse header*/}
			<button
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
				className={listItemStyle}
				data-bs-toggle="collapse"
				href="#collapse-following-thread"
				role="button"
				aria-expanded="true"
				aria-controls="collapseExample"
			>
				<a>Following Community</a>
				<p
					style={isExpanded ? { transform: "rotate(180deg)" } : {}}
					className="m-0 p-0"
				>
					<IoIosArrowDown />
				</p>
			</button>

			{/*collapse body*/}
			<div
				className="ms-3  collapse  border-left-gray"
				id="collapse-following-thread"
			>
				<div className="w-100 d-flex flex-column justify-content-between ">
					{data.map((thread) => {
						return (
							<a
								key={thread._id}
								href={`http://localhost:3000/forum/communities/${thread._id}`}
								className={nestedListItemStyle}
							>
								{thread.title}
							</a>
						);
					})}
				</div>
			</div>
		</>
	);
}

function TopicWrapper({ children }) {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<section className="py-2">
			{/*collapse header*/}
			<button
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
				className={listHeadingStyle}
				data-bs-toggle="collapse"
				href="#collapse3"
				aria-expanded="true"
				aria-controls="collapseExample"
			>
				<p className="m-0 p-0">Topic</p>
				<p
					style={!isExpanded ? { transform: "rotate(180deg)" } : {}}
					className="m-0 p-0"
				>
					<IoIosArrowDown />
				</p>
			</button>
			{/*collapse body*/}
			<div className="collapse show " id="collapse3">
				{children}
			</div>
		</section>
	);
}

function TopicList() {
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);
	
	const path = baseUrl + "/api/v1/topics";
	const { data, error, isLoading } = useSwr(path, fetcher);
	if (error) {
		return <></>;
	}
	if (isLoading) {
		return <></>;
	}
	return data.map((topic) => {
		return (
			<a
				href={`http://localhost:3000/forum/topics/${topic._id}`}
				key={topic._id}
				className={listItemStyle}
			>
				{topic.title}
			</a>
		);
	});
}
