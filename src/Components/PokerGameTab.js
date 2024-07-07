import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardDisplay from "./CardDisplay";
import DecisionButtons from "./DecisionButtons";
import GameOver from "./GameOver";
import IncorrectAnswers from "./IncorrectAnswers";

const PokerGameTab = ({
  gameOver,
  score,
  highScore,
  hand,
  situation,
  position,
  availableActions,
  makeDecision,
  lives,
  streak,
  restartGame,
  wrongChoices,
}) => {
  return (
    <>
      {!gameOver ? (
        <>
          <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6">Score: {score}</Typography>
            <Typography variant="h6">High Score: {highScore}</Typography>
          </Grid>
          <CardDisplay hand={hand} />
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="body1">
              Situation: {situation}
              <br />
              Position: {position}
            </Typography>
          </Box>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            What's your decision?
          </Typography>
          <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} />
          <Box sx={{ my: 2 }}>
            <Typography variant="body2">Lives: {lives}</Typography>
          </Box>
          <Typography align="center" sx={{ fontWeight: "bold" }}>
            Streak: {streak} {streak > 0 && <span>(+{streak * 10}% bonus)</span>}
          </Typography>
        </>
      ) : (
        <>
          <GameOver score={score} highScore={highScore} restartGame={restartGame} />
          <IncorrectAnswers wrongChoices={wrongChoices} />
        </>
      )}
    </>
  );
};

export default PokerGameTab;
