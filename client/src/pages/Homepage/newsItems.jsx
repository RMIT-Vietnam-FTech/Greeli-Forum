import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

const NewList = (props) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767); // State for responsiveness
	// const data = props.data;
	const [data, setData] = useState([]);

	const Card = (props) => {
		return (
			<div className={`card mx-2 bg-greeli-subtle shadow-none ${isMobile ? "col-12" : "col-md-3"}`}>
				<img
					src={props.img}
					className="card-img-top"
					alt={props.title}
				/>
				<div className="card-body pb-0">
					<p className="card-text">
						<small className="text-body-secondary">
							{props.date}
						</small>
					</p>
					<h5 className="card-title">{props.title}</h5>
				</div>
			</div>
		);
	};

	// Handle window resize for dynamic responsiveness
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Fetch data from API
	useEffect(() => {
    // Fetch data using Axios when component mounts
    	axios.get("http://localhost:3001/api/news/get")
      	.then(response => {
        	setData(response.data);
			console.log(response.data);
      	})
      	.catch(error => {
        	console.error('Error fetching data:', error);
      	});
  	}, []);
	return (
		<>
			<div className="container my-5 p-5">
				<h3 className="fw-bold text-greeli-emphasis">
					Recommended Posts
				</h3>
				{isMobile ? ( // Display carousel for mobile
					<Carousel interval={3000}>
						{/* Set carousel auto-play interval (optional) */}
						{data.slice(0, 4).map((item) => (
							<Carousel.Item key={item.id}>
								<Card
									img={item.image}
									date={item.date}
									title={item.title}
								/>
							</Carousel.Item>
						))}
					</Carousel>
				) : (
					<div className="row flex-nowrap gx-2 mx-2">
						{data.slice(0, 4).map((item) => (
							<Card
								key={item.id}
								img={item.image}
								date={item.date}
								title={item.title}
							/>
						))}
					</div>
				)}
				<div className="d-flex justify-content-center mt-5">
					<button
						className="text-center text-white btn theme-button bg-primary-green-700 btn-lg px-5 py-3 rounded-pill fw-bold"
						type="button"
					>
						Read more
					</button>
				</div>
			</div>
		</>
	);
};

export default NewList;
