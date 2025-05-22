import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "./CarouselButtons";
import FlipCard from "./FlipCard";

const CarouselComponent = ({ wrongChoices, flippedCards, toggleFlip }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true 
  };

  return (
    <div
      style={{
        width: isDesktop ? '60%' : '100%',
        margin: '0 auto',
      }}
    >
      <Slider {...settings}>
        {wrongChoices.map((choice, index) => (
          <div key={index}>
            <FlipCard index={index} choice={choice} flippedCards={flippedCards} toggleFlip={toggleFlip} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;