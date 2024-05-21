import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";

function Posts() {
	const Post = (props) => {
		return (
			<div className="news-card rounded-3">
				<img
					src={props.img}
					alt="News"
					className="card-img-top h-50 object-fit-cover rounded-top-3"
				/>
				<div className="cards-body h-auto">
					<p className="card-date">
						<small>{props.date}</small>
					</p>
					<h4>{props.title}</h4>
				</div>
			</div>
		);
	};

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		lazyLoad: true,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 2, // Change to 2 cards for tablets
					slidesToScroll: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1, // Change to 1 card for mobile
					slidesToScroll: 1,
					infinite: true,
				},
			},
		],
	};

	// Fetch data from API
	const [data, setData] = useState([]);
	useEffect(() => {
		// Fetch data using Axios when component mounts
		axios
			.get("http://localhost:3001/api/v1/news/get")
			.then((response) => {
				setData(response.data);
				console.log(response.data);
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
			<Slider {...settings} className="slider-container" ref={sliderRef}>
				{data.map((item) => (
					<Post
						key={item.id}
						img={item.image}
						date={item.date}
						title={item.title}
					/>
				))}
			</Slider>
		</div>
	);
}
export default Posts;
