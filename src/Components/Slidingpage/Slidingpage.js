import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slidingpage.css";

const SlidingPage = () => {
  const images = [
    "./Images/Image1.jpg",
    "./Images/Image2.jpg",
    "./Images/Image3.jpg",
    "./Images/Image4.jpg",
    "./Images/Image5.jpg",
    "./Images/Image6.jpg"
  ];

  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <i className="fa-solid fa-caret-left arrow-button"></i>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <i className="fa-solid fa-caret-right arrow-button"></i>
      </div>
    );
  };

  const slides = images.map((image, index) => (
    <div key={index}>
      <img
        className="slide-images"
        src={require(`${image}`)}
        alt={`Slide ${index + 1}`}
      />
    </div>
  ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="slide-box">
      <Slider {...settings}>{slides}</Slider>
    </div>
  );
};

export default SlidingPage;
