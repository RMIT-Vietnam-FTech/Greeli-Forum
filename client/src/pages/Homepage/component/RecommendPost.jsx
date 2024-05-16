import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import axios from "axios";

function Posts() {
	const Post = (props) => {
		return (
			<div className="news-card  rounded-3">
				<img
					src={props.img}
					alt="News"
					className="card-img-top rounded-top-3"
					crossOrigin="anonymous"
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
		speed: 100,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		lazyLoad: true,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 3, // Change to 3 cards for tablets
					slidesToScroll: 3,
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
			.get("/api/v1/news/get")
			.then((response) => {
				setData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<Slider {...settings} className="slider-container">
			{data.map((item) => (
				<Post
					key={item.id}
					img={item.image}
					date={item.date}
					title={item.title}
				/>
			))}
		</Slider>
	);
}
export default Posts;
