import React, { useState } from "react";
import { Typography, Paper, useTheme } from "@mui/material";
import StyledLink from "./StyledLink";
import CarouselComponent from "./CarouselComponent";

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
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
      <StyledLink />
      <CarouselComponent wrongChoices={wrongChoices} flippedCards={flippedCards} toggleFlip={toggleFlip} />
    </Paper>
  );
};

export default IncorrectAnswers;
