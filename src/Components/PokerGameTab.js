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
  // New props
  highlightedAction,
  answerFeedback,
  difficulty, // difficulty is available if needed
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between", 
      }}
    >
      {!gameOver ? (
        <>
          <Box>
            {/* Top section */}
            <Grid container justifyContent="space-between" sx={{ mb: 2, textAlign: "left" }}>
              <Typography variant="body1">Score: {score}</Typography>
              <Typography variant="body1">High Score: {highScore}</Typography>
            </Grid>

            {/* Increase spacing for HandDealer */}
            <Box sx={{ my: 3 }}>
              <HandDealer hand={hand} />
            </Box>

            {/* Increase padding and margin for situation info */}
            <Paper elevation={3} sx={{ p: 2, my: 3, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
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

            {/* Add more space before the decision prompt */}
            <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
              What's your decision?
            </Typography>

            {/* Answer Feedback Display */}
            {answerFeedback && (
              <Typography 
                variant="h5" 
                align="center" 
                sx={{ 
                  my: 2, 
                  fontWeight: "bold",
                  color: answerFeedback === "correct" ? "success.main" : "error.main" 
                }}
              >
                {answerFeedback === "correct" ? "Correct!" : "Incorrect!"}
              </Typography>
            )}
          </Box>

          {/* Center section - Decision Buttons */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <DecisionButtons 
              availableActions={availableActions} 
              makeDecision={makeDecision} 
              highlightedAction={highlightedAction} // Pass prop
            />
          </Box>

          {/* Bottom section */}
          <Box
            sx={{
              mt: 3,
              pt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)", 
            }}
          >
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
    </Box>
  );
};

export default PokerGameTab;
