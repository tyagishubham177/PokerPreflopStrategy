import React from "react";
import { Box, Grid, Typography, Paper, Button, useTheme } from "@mui/material"; // Added Button, useTheme
import FavoriteIcon from '@mui/icons-material/Favorite'; // Added FavoriteIcon
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
  hintedAction, 
  // New props for the bottom bar UI
  timeLeft,
  hints,
  handleHintClick,
  isHintButtonDisabled,
}) => {
  const theme = useTheme(); // Added useTheme

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
          </Box>

          {/* Center section - Decision Buttons */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} hintedAction={hintedAction} />
          </Box>

          {/* Bottom section */}
          <Box
            sx={{
              mt: 3,
              pt: 2,
              display: "flex",
              justifyContent: "space-between", // Ensure this is set
              alignItems: "center",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)", 
            }}
          >
            {/* Lives (Hearts) Display */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {Array.from({ length: lives }).map((_, index) => (
                <FavoriteIcon
                  key={`life-${index}`}
                  sx={{ color: 'red', fontSize: '1.25rem', mr: 0.5 }} 
                />
              ))}
            </Box>

            {/* Timer Display */}
            {!gameOver && ( // Only show timer if game is not over
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: timeLeft <= 5 ? theme.palette.error.main : (timeLeft <= 10 ? theme.palette.warning.main : 'inherit')
                }}
              >
                {formatTime(timeLeft)}
              </Typography>
            )}
            
            {/* Hint Button */}
            <Button
              size="small"
              variant="outlined"
              onClick={handleHintClick}
              disabled={isHintButtonDisabled || gameOver} // Also disable if game over
            >
              Hint ({hints})
            </Button>

            {/* Streak Display */}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Streak: {streak}{" "}
              {streak > 0 && <span style={{ color: theme.palette.success.main }}>(+{streak * 10}% bonus)</span>}
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
