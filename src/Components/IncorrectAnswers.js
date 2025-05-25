import React, { useState } from "react";
import { Typography, Paper, useTheme } from "@mui/material";
import StyledLink from "./StyledLink";
import CarouselComponent from "./CarouselComponent";
import ChartDisplayModal from "./ChartDisplayModal";

const IncorrectAnswers = ({ wrongChoices = [] }) => {
  const theme = useTheme();
  const [flippedCards, setFlippedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentChartData, setCurrentChartData] = useState({
    situationKey: '',
    positionKey: '',
    decisionKey: '',
    handNotation: '',
    yourChoice: '', 
    highlightFoldCell: false
  });

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInfoClick = (choice) => {
    setCurrentChartData({
      situationKey: choice.situationKey,
      positionKey: choice.positionKey,
      decisionKey: choice.correctDecision,
      handNotation: choice.handNotation,
      yourChoice: choice.yourChoice,
      highlightFoldCell: choice.correctDecision === 'Fold' && choice.yourChoice !== 'Fold'
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
      <CarouselComponent 
        wrongChoices={wrongChoices} 
        flippedCards={flippedCards} 
        toggleFlip={toggleFlip} 
        onInfoClick={handleInfoClick}
      />
      <ChartDisplayModal
        open={modalOpen}
        onClose={handleCloseModal}
        title="Strategy Chart"
        situationKey={currentChartData.situationKey}
        positionKey={currentChartData.positionKey}
        decisionKey={currentChartData.decisionKey}
        handNotation={currentChartData.handNotation}
        yourChoice={currentChartData.yourChoice}
        highlightFoldCell={currentChartData.highlightFoldCell}
      />
    </Paper>
  );
};

export default IncorrectAnswers;
