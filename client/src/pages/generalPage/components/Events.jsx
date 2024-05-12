import React, { useState, useContext, useRef } from "react";
import Slider from "react-slick";
import { ThemeContext } from "../../../context/ThemeContext";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import EventsData from "../data/eventsData";
import "../style.css";

const Card = ({ image, title, description, date, event }) => {
	return (
		<div className="card">
			<img src={image} className="card-img-top" alt={title} />
			<div className="events-cards-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{description}</p>
				<p className="card-date">
					<small className="date">{date}</small>
				</p>
			</div>
		</div>
	);
};

export default function Events() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: false,
					lazyLoad: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					lazyLoad: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					lazyLoad: true,
				},
			},
		],
	};

	const [category, setCategory] = useState("Social activities");
	const filteredData =
		category === "Social activities"
			? EventsData
			: EventsData.filter((item) => item.event === category);

	const isActive = (clickedCategory) => {
		return category === clickedCategory ? "active" : "";
	};

	const { isDarkMode } = useContext(ThemeContext);

	const sliderRef = useRef();
	const handleWheel = (e) => {
		if (e.deltaX > 0) {
			sliderRef.current.slickNext();
		}
	};

	return (
		<>
			<section className="news bg-greeli-subtle" data-bs-theme={isDarkMode ? "dark" : "light"}>
				<h4 className="popularNews text-general-emphasis">EVENTS</h4>
				<ul className="nav nav-pills events_selection">
					<li
						className={`${
							isDarkMode
								? "navigation-item-dark-mode"
								: "navigation-item"
						} ${isActive("Social activities")}`}
						onClick={() => setCategory("Social activities")}
					>
						<h4>Social activities</h4>
					</li>
					<li
						className={`${
							isDarkMode
								? "navigation-item-dark-mode"
								: "navigation-item"
						} ${isActive("Social events")}`}
						onClick={() => setCategory("Social events")}
					>
						<h4>Social events</h4>
					</li>
				</ul>

				<section className="newsContainer">
					<div onWheel={handleWheel}>
						<Slider ref={sliderRef} {...settings} className="slider">
							{filteredData.map((item) => (
								<Card
									key={item.id}
									image={item.image}
									title={item.title}
									description={item.description}
									date={item.date}
									event={item.event}
								/>
							))}
						</Slider>
					</div>
				</section>
			</section>
		</>
	);
}
