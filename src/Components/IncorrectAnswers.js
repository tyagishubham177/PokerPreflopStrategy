import React, { useState } from "react";
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery, Link } from "@mui/material";
import FlipCard from "./FlipCard";
import StyledLink from "./StyledLink";

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
      <Grid
        container
        spacing={3}
        sx={{ overflowY: isDesktop ? "visible" : "scroll", maxHeight: isDesktop ? "none" : "300px" }}
      >
        {wrongChoices.slice(0, 3).map((choice, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{
              display: "block",
              marginBottom: isDesktop ? 0 : "10px",
              "&:last-child": {
                marginBottom: 0,
              },
            }}
          >
            <FlipCard
              index={index}
              choice={choice}
              flippedCards={flippedCards}
              toggleFlip={toggleFlip}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default IncorrectAnswers;
