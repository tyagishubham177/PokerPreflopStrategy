import React from "react";
import { useTheme, useMediaQuery, Box, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "./CarouselButtons";
import FlipCard from "./FlipCard";

const CarouselComponent = ({ wrongChoices, flippedCards, toggleFlip, onInfoClick }) => {
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
            <Box sx={{ position: 'relative' }}>
              <IconButton
                aria-label="info"
                onClick={() => onInfoClick(choice)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1, 
                  color: 'primary.main' 
                }}
              >
                <InfoIcon />
              </IconButton>
              <FlipCard index={index} choice={choice} flippedCards={flippedCards} toggleFlip={toggleFlip} />
            </Box>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;