import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, CardMedia, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SlidingPage = () => {
  const images = [
    "./images/Image2.jpg",
    "./images/Image3.jpg",
    "./images/Image4.jpg",
    "./images/Image1.jpg",
    "./images/Image5.jpg",
    "./images/Image6.jpg"
  ];

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton style={slideStyles.prevArrow} onClick={onClick}>
        <ArrowBackIcon />
      </IconButton>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton style={slideStyles.nextArrow} onClick={onClick}>
        <ArrowForwardIcon />
      </IconButton>
    );
  };

  const slides = images.map((image, index) => (
    <Box key={index}>
      <CardMedia
        component="img"
        style={slideStyles.slideImages}
        image={require(`${image}`)}
        alt={`Slide ${index + 1}`}
      />
    </Box>
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
    <Box style={slideStyles.slideBox}>
      <Slider {...settings}>{slides}</Slider>
    </Box>
  );
};

const slideStyles = {
  slideBox: {
    marginTop: "10px",
    marginLeft: "40px",
    marginRight: "40px"
  },
  prevArrow: {
    position: "absolute",
    left: "-40px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: "1",
    color: "#144981",
    cursor: "pointer",
  },
  nextArrow: {
    position: "absolute",
    right: "-40px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: "1",
    color: "#144981",
    cursor: "pointer",
  },
  slideImages: {
    width: "100%",
    height: "400px",
    objectFit: "cover"
}
};

export default SlidingPage;
