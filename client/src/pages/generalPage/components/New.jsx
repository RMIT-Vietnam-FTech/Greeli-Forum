// import React, { useState, useEffect, useContext } from "react";
// import Slider from "react-slick";
// import NewsData from "../data/newsData";
// import "../style.css";
// import { ThemeContext } from "../../../context/ThemeContext"

// const Card = ({ image, topic, title, description, userImage, userName }) => {
// 	return (
// 		<div className="news-card">
// 			<img className="card-img-top" src={image} alt="News" />
// 			<div className="cards-body">
// 				<h6>{topic}</h6>
// 				<h4>{title}</h4>
// 				<p>{description}</p>
// 				<div className="user-info">
// 					<img
// 						className="circle-img"
// 						src={userImage}
// 						alt={userName}
// 					/>
// 					<span>{userName}</span>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default function News() {
// 	const [category, setCategory] = useState("All");
// 	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// 	const filteredData =
// 		category === "All"
// 			? NewsData
// 			: NewsData.filter((item) => item.topic === category);

// 	const handleResize = () => {
// 		setIsMobile(window.innerWidth < 768);
// 	};

// 	useEffect(() => {
// 		window.addEventListener("resize", handleResize);
// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 		};
// 	}, []);

// 	const isActive = (clickedCategory) => {
// 		return category === clickedCategory ? "active" : "";
// 	};

// 	const { isDarkMode } = useContext(ThemeContext);

// 	const settings = {
// 		dots: true,
// 		infinite: false,
// 		speed: 500,
// 		slidesToShow: 4,
// 		slidesToScroll: 4,
// 		initialSlide: 0,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					slidesToShow: 3,
// 					slidesToScroll: 3,
// 					infinite: true,
// 					dots: true,
// 				},
// 			},
// 			{
// 				breakpoint: 600,
// 				settings: {
// 					slidesToShow: 2,
// 					slidesToScroll: 2,
// 					initialSlide: 2,
// 				},
// 			},
// 			{
// 				breakpoint: 480,
// 				settings: {
// 					slidesToShow: 1,
// 					slidesToScroll: 1,
// 				},
// 			},
// 		],
// 	};

// 	return (
// 		<>
// 			<section className="news bg-greeli-subtle" data-bs-theme={isDarkMode ? "dark" : "light"}>
// 				<h4 className="popularNews text-general-emphasis">POPULAR NEWS</h4>
// 				{isMobile ? (
// 					<div className="dropdown mt-2">
// 						<button
// 							className={`${isDarkMode ? 'btn btn-secondary dropdown-toggle rounded-pill bg-primary-green-900 text-primary-yellow active' : 'btn btn-secondary dropdown-toggle rounded-pill bg-light text-primary-green active'}`}
// 							type="button"
// 							data-bs-toggle="dropdown"
// 							aria-expanded="false"
// 						>
// 							{category}
// 						</button>
// 						<ul className={`${isDarkMode ? 'bg-dark' : 'bg-light'} dropdown-menu` }>
// 							<li>
// 								<button
// 									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item` }
// 									onClick={() => setCategory("All")}
// 								>
// 									All
// 								</button>
// 							</li>
// 							<li>
// 								<button
// 									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item` }
// 									onClick={() => setCategory("Shopping")}
// 								>
// 									Shopping
// 								</button>
// 							</li>
// 							<li>
// 								<button
// 									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item'} dropdown-item` }
// 									onClick={() => setCategory("Eating")}
// 								>
// 									Eating
// 								</button>
// 							</li>
// 							<li>
// 								<button
// 									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item'} dropdown-item` }
// 									onClick={() =>
// 										setCategory("Transportation")
// 									}
// 								>
// 									Transportation
// 								</button>
// 							</li>
// 						</ul>
// 					</div>
// 				) : (
// 					<ul className="nav nav-pills selection">
// 						<li
// 							className={`${isActive("All")} ${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'}`} 
// 							onClick={() => setCategory("All")}
// 						>
// 							<h4>All</h4>
// 						</li>
// 						<li
// 							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Shopping")}`}
// 							onClick={() => setCategory("Shopping")}
// 						>
// 							<h4>Shopping</h4>
// 						</li>
// 						<li
// 							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Eating")}`}
// 							onClick={() => setCategory("Eating")}
// 						>
// 							<h4>Eating</h4>
// 						</li>
// 						<li
// 							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Transportation")}`}
// 							onClick={() => setCategory("Transportation")}
// 						>
// 							<h4>Transportation</h4>
// 						</li>
// 					</ul>
// 				)}

// 				<section className="newsContainer">
// 					<Slider {...settings} className="slider">
// 						{filteredData.map((item) => (
// 							<Card
// 								key={item.id}
// 								image={item.image}
// 								topic={item.topic}
// 								title={item.title}
// 								description={item.description}
// 								userImage={item.userImage}
// 								userName={item.userName}
// 							/>
// 						))}
// 					</Slider>
// 				</section>
// 			</section>
// 		</>
// 	);
// }

// News.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import Slider from "react-slick";
import { ThemeContext } from "../../../context/ThemeContext";
import fetchNewsByCategory from "../data/newsData"
import "../style.css";

const Card = ({ image, topic, title, description, userImage, userName, url }) => {
	const truncateText = (text, maxLength) => {
		if (text == null || typeof text !== "string") { return ""; }
		return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
	};

	return (
		<div className="news-card" onClick={() => window.open(url, "_blank")}>
			<img className="card-img-top" src={image || "https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"} alt="News" style={{ height: "200px", objectFit: "cover" }} />
			<div className="cards-body">
				<h6>{topic}</h6>
				<h4>{truncateText(title, 50)}</h4>
				<p>{truncateText(description, 100)}</p>
				<div className="user-info">
					<img
						className="circle-img"
						src={userImage || "https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"}
						alt={userName}
						style={{ height: "50px", width: "50px", borderRadius: "50%" }}
					/>
					<span>{userName}</span>
				</div>
			</div>
		</div>
	);
};

export default function News() {
	const [newsData, setNewsData] = useState([]);
	const [category, setCategory] = useState("All");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { isDarkMode } = useContext(ThemeContext);

	const isActive = (clickedCategory) => {
		return category === clickedCategory ? "active" : "";
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const loadNewsData = async () => {
			setLoading(true);
			setError("");
			try {
				const data = await fetchNewsByCategory(category);
				setNewsData(data);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch news. Please try again later.");
				setLoading(false);
			}
		};

		loadNewsData();
	}, [category]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: isMobile ? 1 : 4,
		slidesToScroll: isMobile ? 1 : 4,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
					lazyLoad: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false,
					lazyLoad: true,
				},
			},
			{
				breakpoint: 700,
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

	const sliderRef = useRef();
	const handleWheel = (e) => {
		if (e.deltaX > 0) {
			sliderRef.current.slickNext();
		}
	};

	return (
		<>
			<section
				className="news bg-greeli-subtle"
				data-bs-theme={isDarkMode ? "dark" : "light"}
			>
				<h4 className="popularNews text-general-emphasis">
					POPULAR NEWS
				</h4>
				{isMobile ? (
					<div className="dropdown mt-2">
						<button
							className={`${isDarkMode
								? "btn btn-secondary dropdown-toggle rounded-pill bg-primary-green-900 text-primary-yellow active"
								: "btn btn-secondary dropdown-toggle rounded-pill bg-light text-primary-green active"
								}`}
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{category}
						</button>
						<ul className={`${isDarkMode ? 'bg-dark' : 'bg-light'} dropdown-menu`}>
							<li>
								<button
									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item`}
									onClick={() => setCategory("All")}
								>
									All
								</button>
							</li>
							<li>
								<button
									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item`}
									onClick={() => setCategory("Business")}
								>
									Business
								</button>
							</li>
							<li>
								<button
									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item`}
									onClick={() => setCategory("Health")}
								>
									Health
								</button>
							</li>
							<li>
								<button
									className={`${isDarkMode ? 'dropdown-item-dark-mode' : 'dropdown-item-light'} dropdown-item`}
									onClick={() => setCategory("Sports")}
								>
									Sports
								</button>
							</li>
						</ul>
					</div>
				) : (
					<ul className="nav nav-pills selection">
						<li
							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("All")}`}
							onClick={() => setCategory("All")}
						>
							<h4>All</h4>
						</li>
						<li
							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Business")}`}
							onClick={() => setCategory("Business")}
						>
							<h4>Business</h4>
						</li>
						<li
							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Health")}`}
							onClick={() => setCategory("Health")}
						>
							<h4>Health</h4>
						</li>
						<li
							className={`${isDarkMode ? 'navigation-item-dark-mode' : 'navigation-item'} ${isActive("Sports")}`}
							onClick={() => setCategory("Sports")}
						>
							<h4>Sports</h4>
						</li>
					</ul>
				)}

				{loading ? (
					<>
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							‎ Loading...
						</button>
						<div style={{ height: '450px' }}></div>

						{/* <section className="loadingContainer">
							<div className="loading-news-card">
								<img className="loading-card-img-top" src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"} alt="News" style={{ height: "200px", objectFit: "cover" }} />
								<div className="cards-body">
									<h6>...loading</h6>
									<h4>...loading</h4>
									<p>...loading</p>
									<div className="user-info">
										<img
											className="circle-img"
											src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"}
											alt="...loading"
											style={{ height: "50px", width: "50px", borderRadius: "50%" }}
										/>
										<span>...loading</span>
									</div>
								</div>
							</div>

							<div className="loading-news-card">
								<img className="loading-card-img-top" src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"} alt="News" style={{ height: "200px", objectFit: "cover" }} />
								<div className="cards-body">
									<h6>...loading</h6>
									<h4>...loading</h4>
									<p>...loading</p>
									<div className="user-info">
										<img
											className="circle-img"
											src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"}
											alt="...loading"
											style={{ height: "50px", width: "50px", borderRadius: "50%" }}
										/>
										<span>...loading</span>
									</div>
								</div>
							</div>

							<div className="loading-news-card">
								<img className="loading-card-img-top" src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"} alt="News" style={{ height: "200px", objectFit: "cover" }} />
								<div className="cards-body">
									<h6>...loading</h6>
									<h4>...loading</h4>
									<p>...loading</p>
									<div className="user-info">
										<img
											className="circle-img"
											src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"}
											alt="...loading"
											style={{ height: "50px", width: "50px", borderRadius: "50%" }}
										/>
										<span>...loading</span>
									</div>
								</div>
							</div>

							<div className="loading-news-card">
								<img className="loading-card-img-top" src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"} alt="News" style={{ height: "200px", objectFit: "cover" }} />
								<div className="cards-body">
									<h6>...loading</h6>
									<h4>...loading</h4>
									<p>...loading</p>
									<div className="user-info">
										<img
											className="circle-img"
											src={"https://www.solidbackgrounds.com/images/3840x2160/3840x2160-light-gray-solid-color-background.jpg"}
											alt="...loading"
											style={{ height: "50px", width: "50px", borderRadius: "50%" }}
										/>
										<span>...loading</span>
									</div>
								</div>
							</div>
						</section> */}
					</>
				) : error ? (
					<p>{error}</p>
				) : (
					<section className="newsContainer">
						<div onWheel={handleWheel} className={`${isDarkMode ? 'darkTheme' : ''}`}>
							<Slider ref={sliderRef} {...settings} className="slider">
								{newsData.map((item, index) => (
									<Card
										key={index}
										image={item.urlToImage}
										topic={item.source.name}
										title={item.title}
										description={item.description}
										userImage={item.urlToImage}
										userName={item.author || "Unknown"}
										url={item.url}
									/>
								))}
							</Slider>
						</div>
					</section>
				)}
			</section>
		</>
	);
};

