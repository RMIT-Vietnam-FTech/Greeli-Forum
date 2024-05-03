import React, {useState} from "react";
import '../style.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsData from '../data/newsData';

const Card = ({ image, topic, title, description, userImage, userName }) => {
    return (
        <div className="card news-card">
            <img className="card-img-top" src={image} alt="News" />
            <div className="card-body">
                <h6>{topic}</h6>
                <h4>{title}</h4>
                <p>{description}</p>
                <div className="user-info">
                    <img className="circle-img" src={userImage} alt={userName} />
                    <span>{userName}</span>
                </div>
            </div>
        </div>
    );
};

export default function News() {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [category, setCategory] = useState('All');
    const filteredData = category === 'All' ? NewsData : NewsData.filter(item => item.topic === category);

    return (
        <>
            <section className="news">
                <h4 className="popularNews">POPULAR NEWS</h4>
                <ul className="nav nav-pills selection">
                    <li className="nav-item" onClick={() => setCategory('All')}>
                        <h4>All</h4>
                    </li>
                    <li className="nav-item" onClick={() => setCategory('Shopping')}>
                        <h4>Shopping</h4>
                    </li>
                    <li className="nav-item" onClick={() => setCategory('Eating')}>
                        <h4>Eating</h4>
                    </li>
                    <li className="nav-item" onClick={() => setCategory('Transportation')}>
                        <h4>Transportation</h4>
                    </li>
                </ul>

                <section className="newsContainer">
                    <Slider {...settings} className="slider">
                        {filteredData.map(item => (
                            <Card
                                key={item.id}
                                image={item.image}
                                topic={item.topic}
                                title={item.title}
                                description={item.description}
                                userImage={item.userImage}
                                userName={item.userName}
                            />
                        ))}
                    </Slider>
                </section>
            </section>
        </>
    );
}
