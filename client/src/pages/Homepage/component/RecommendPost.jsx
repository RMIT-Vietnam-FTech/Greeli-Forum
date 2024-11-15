import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function Posts() {
	const Post = (props) => {
		return (
			<Link
				to={`/forum/communities/${props.belongToThread}/posts/${props.id}`}
			>
				<div className="news-card card-item rounded-4">
					<img
						src={props.img}
						alt="Recommended Post"
						className="card-img-top h-50 object-fit-cover rounded-top-4"
					/>
					<div className="cards-body">
						<p className="card-date">
							<small>{props.date}</small>
						</p>
						<h4>{props.title}</h4>
					</div>
				</div>
			</Link>
		);
	};

	const handleKeyUp = (event, onClick) => {
		if (event.key === "Enter" || event.key === " ") {
			onClick(event);
		}
	};

	const NextArrow = (props) => {
		const { style, onClick } = props;
		return (
			<div
				style={{
					...style,
					display: "block",
					position: "absolute",
					top: "50%",
					right: "-2rem",
					transform: "translateY(-50%)",
					zIndex: 2,
					cursor: "pointer",
				}}
				onClick={onClick}
				onKeyUp={(event) => handleKeyUp(event, onClick)}
				role="button"
				tabIndex="0"
			>
				<IoIosArrowForward className="text-greeli-emphasis" size={30} />
			</div>
		);
	};

	const PrevArrow = (props) => {
		const { style, onClick } = props;
		return (
			<div
				style={{
					...style,
					display: "block",
					position: "absolute",
					top: "50%",
					left: "-2rem",
					transform: "translateY(-50%)",
					zIndex: 2,
					cursor: "pointer",
				}}
				onClick={onClick}
				onKeyUp={(event) => handleKeyUp(event, onClick)}
				role="button"
				tabIndex="0"
			>
				<IoIosArrowBack className="text-greeli-emphasis" size={30} />
			</div>
		);
	};

	const settings = {
		dots: false,
		infinite: false,
		accessibility: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		lazyLoad: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 2,
					swipeToSlide: true,
					slidesToScroll: 1,
					infinite: false,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					swipeToSlide: true,
					slidesToScroll: 1,
					infinite: false,
					fade: true,
				},
			},
		],
	};

	// Fetch data from API
	const devUrl = "http://localhost:3001";
	let baseUrl = "";

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			baseUrl = devUrl;
		} else {
			baseUrl = "";
		}
	}, [process.env.NODE_ENV]);
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.get(baseUrl + "/api/v1/posts")
			.then((response) => {
				setData(response.data.data);
				console.log(response.data.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	const sliderRef = useRef();
	const handleWheel = (e) => {
		if (e.deltaX > 0) {
			sliderRef.current.slickNext();
		}
		if (e.deltaX < 0) {
			sliderRef.current.slickPrev();
		}
	};

	return (
		<div onWheel={handleWheel}>
			<Slider
				{...settings}
				className="slider-container p-3"
				ref={sliderRef}
			>
				{data
					.filter((d) => !d.archived?.isArchived === true)
					.map(
						(item) =>
							item.uploadFile?.type === "image" && (
								<Post
									key={item._id} // Use _id from MongoDB
									id={item._id} // Pass the id to the Post component
									img={item.uploadFile?.src} // Ensure the image source is correctly passed
									date={item.verifiedAt.substring(0, 10)}
									title={item.title}
									belongToThread={item.belongToThread} // Pass belongToThread to the Post component
								/>
							),
					)}
			</Slider>
		</div>
	);
}

export default Posts;
