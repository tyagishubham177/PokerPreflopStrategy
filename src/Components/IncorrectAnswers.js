import React, { useState } from "react";
import { Typography, Paper, useTheme } from "@mui/material";
import StyledLink from "./StyledLink";
import CarouselComponent from "./CarouselComponent";
import ChartDisplayModal from "./ChartDisplayModal"; // Import the modal

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const [flippedCards, setFlippedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  // Updated state structure for currentChartData
  const [currentChartData, setCurrentChartData] = useState({
    situationKey: '',
    positionKey: '',
    decisionKey: '',
    handNotation: '' // Add handNotation
  });

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInfoClick = (choice) => {
    setCurrentChartData({
      situationKey: choice.situationKey,
      positionKey: choice.positionKey,
      decisionKey: choice.correctDecision, // choice.correctDecision is the action like "Raise"
      handNotation: choice.handNotation // Add this line
    });
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
        title="Strategy Chart" // Updated title
        situationKey={currentChartData.situationKey} // Pass situationKey
        positionKey={currentChartData.positionKey} // Pass positionKey
        decisionKey={currentChartData.decisionKey} // Pass decisionKey
        handNotation={currentChartData.handNotation} // Add this prop
      />
    </Paper>
  );
};

export default IncorrectAnswers;
