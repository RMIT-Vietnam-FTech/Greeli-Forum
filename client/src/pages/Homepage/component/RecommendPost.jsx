import React, { useState, useEffect, useRef, lazy } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";

function Posts() {
	const Post = (props) => {
		return (
			<div className="news-card card-item rounded-4">
				<img
					src={props.img}
					alt="News"
					className="card-img-top h-50 object-fit-cover rounded-top-4"
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
          zIndex: 2, // Ensure arrows are on top of the slider
          cursor: "pointer",
        }}
        onClick={onClick}
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
          zIndex: 2, // Ensure arrows are on top of the slider
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <IoIosArrowBack className="text-greeli-emphasis" size={30} />
      </div>
    );
  };

	const settings = {
		dots: false,
		accessibility: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,
		swipe: true,
		initialSlide: 0,
		lazyLoad: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
		{
			breakpoint: 993,
			settings: {
			slidesToShow: 2, // Change to 2 cards for tablets
			swipeToSlide: true,
			slidesToScroll: 1,
			infinite: true,
			},
		},
		{
			breakpoint: 576,
			settings: {
			slidesToShow: 1, // Change to 1 card for mobile
			swipeToSlide: true,
			slidesToScroll: 1,
			infinite: true,
			fade: true,
			},
		},
		],
	};

	// Fetch data from API
	const [data, setData] = useState([]);
  useEffect(() => {
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
