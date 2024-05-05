import React from "react";
import "../style.css";

export default function Update({ data }) {
	return (
		<>
			<section>
				<div
					id="carouselExampleAutoplaying"
					className="carousel slide"
					data-bs-ride="carousel"
				>
					<div className="carousel-inner">
						{data.map((item, index) => (
							<div
								className={`carousel-item ${
									index === 0 ? "active" : ""
								}`}
								key={item.id}
							>
								<img
									src={item.image}
									className="d-block w-100 carousel-image"
									alt={item.title}
								/>
								<div className="custom-caption">
									<div className="caption-line" />
									<h5>{item.title}</h5>
									<p>{item.description}</p>
								</div>
							</div>
						))}
					</div>

					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleAutoplaying"
						data-bs-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						/>
						<span className="visually-hidden">Previous</span>
					</button>

					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleAutoplaying"
						data-bs-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						/>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</section>
		</>
	);
}
