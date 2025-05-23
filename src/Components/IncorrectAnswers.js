import React, { useState } from "react";
import { Typography, Paper, useTheme } from "@mui/material";
import StyledLink from "./StyledLink";
import CarouselComponent from "./CarouselComponent";
import ChartDisplayModal from "./ChartDisplayModal"; // Import the modal

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const [flippedCards, setFlippedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentChartData, setCurrentChartData] = useState({ situation: '', position: '', chartLink: 'https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf' });

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInfoClick = (choice) => {
    setCurrentChartData(prevData => ({
      ...prevData, // Keep the existing chartLink
      situation: choice.situation,
      position: choice.position,
    }));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        mt: 3,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textAlign: "center",
          mb: 3,
          fontSize: "1.5rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Incorrect Answers
      </Typography>
      {/* <StyledLink /> */}
      <CarouselComponent 
        wrongChoices={wrongChoices} 
        flippedCards={flippedCards} 
        toggleFlip={toggleFlip} 
        onInfoClick={handleInfoClick} // Pass the handler
      />
      <ChartDisplayModal
        open={modalOpen}
        onClose={handleCloseModal}
        title="Poker Chart Information"
        situation={currentChartData.situation}
        position={currentChartData.position}
        chartLink={currentChartData.chartLink}
      />
    </Paper>
  );
};

export default IncorrectAnswers;
