import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import HandDealer from "./HandDealer";
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
          <Grid container justifyContent="space-between" sx={{ mb: 2, textAlign: "left" }}>
            <Typography variant="h6">Score: {score}</Typography>
            <Typography variant="h6">High Score: {highScore}</Typography>
          </Grid>
          <HandDealer hand={hand} />
          <Paper elevation={3} sx={{ p: 2, my: 2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
            <Typography variant="body1" sx={{ textAlign: "center", fontWeight: "bold" }}>
              {(() => {
                const parts = position.split(" - ");
                return (
                  <>
                    <span style={{ color: "#1976d2" }}>Situation:</span> {parts[0]}
                    <br />
                    <span style={{ color: "#d32f2f" }}>Villain:</span> {parts[2]}
                    <br />
                    <span style={{ color: "#388e3c" }}>Hero:</span> {parts[1]}
                  </>
                );
              })()}
            </Typography>
          </Paper>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
            What's your decision?
          </Typography>
          <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} />
          <Box sx={{ my: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Lives: {lives}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Streak: {streak}{" "}
              {streak > 0 && <span style={{ color: "#4caf50" }}>(+{streak * 10}% bonus)</span>}
            </Typography>
          </Box>
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
