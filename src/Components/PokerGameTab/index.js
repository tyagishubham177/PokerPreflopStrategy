import React, { useState, useEffect } from "react"; // Added useEffect
import { Box, Grid, Typography, Paper, Button, useTheme, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Or FactCheckIcon / VisibilityIcon
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HandDealer from "../HandDealer";
import DecisionButtons from "../DecisionButtons";
import GameOver from "../GameOver";
import ChartDisplayModal from '../ChartDisplayModal';

const PokerGameTab = ({
  gameOver,
  readyToShowGameOver, // Added prop
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
  timeLeft,
  hints,
  handleHintClick,
  isHintButtonDisabled,
  isPaused,
  togglePausePlay,
  isTimerVisible,
  toggleTimerVisibility,
}) => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHandData, setSelectedHandData] = useState(null);

  useEffect(() => {
    console.log('[PokerGameTab] props changed: gameOver:', gameOver, 'readyToShowGameOver:', readyToShowGameOver);
    if (gameOver && readyToShowGameOver) {
      console.log('[PokerGameTab] Condition met: Rendering GameOver component.');
    } else if (gameOver && !readyToShowGameOver) {
      console.log('[PokerGameTab] Condition met: Rendering Placeholder for GameOver.');
    }
  }, [gameOver, readyToShowGameOver]);

  const handleOpenModal = () => {
    setSelectedHandData(wrongChoices);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedHandData(null); // Optional: Clear data on close
  };

  // Pre-calculate position parts for clarity and robustness
  const positionString = typeof position === 'string' ? position : "N/A - N/A - N/A";
  const parts = positionString.split(" - ");
  const situationDisplayPart = parts[0] || "N/A";
  const heroDisplayPart = parts[1] || "N/A";
  const villainDisplayPart = parts[2] || "N/A";

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
            <Grid container justifyContent="space-between" sx={{ mb: 2, textAlign: "left" }}>
              <Typography variant="body1">Score: {score}</Typography>
              <Typography variant="body1">High Score: {highScore}</Typography>
            </Grid>

            {isPaused ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px', my: 3, p: 2, border: '1px dashed grey', borderRadius: 1, backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <PauseCircleOutlineIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                <Typography variant="h6" sx={{ color: 'text.disabled' }}>Game Paused</Typography>
              </Box>
            ) : (
              <Box sx={{ my: 3 }}>
                <HandDealer hand={hand} />
              </Box>
            )}

            {isPaused ? (
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center', border: '1px dashed grey', backgroundColor: 'rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <PauseCircleOutlineIcon sx={{ fontSize: 30, color: 'text.disabled', mb: 0.5 }} />
                <Typography variant="body1" sx={{ color: 'text.disabled' }}>Situation Hidden</Typography>
              </Paper>
            ) : (
              <Paper elevation={3} sx={{ p: 2, backgroundColor: "rgba(255, 255, 255, 0.9)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="body1" sx={{ textAlign: "center", fontWeight: "bold" }}>
                  <>
                    <span style={{ color: "#1976d2" }}>Situation:</span> {situationDisplayPart}
                    <br />
                    <span style={{ color: "#d32f2f" }}>Villain:</span> {villainDisplayPart}
                    <br />
                    <span style={{ color: "#388e3c" }}>Hero:</span> {heroDisplayPart}
                  </>
                </Typography>
              </Paper>
            )}

            <Typography variant="h6" align="center" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
              What's your decision?
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} hintedAction={hintedAction} isPaused={isPaused} />
          </Box>

          <Box
            sx={{
              mt: 1,
              pt: 2,
              display: "flex",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing(1.5),
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: lives }).map((_, index) => (
                <FavoriteIcon
                  key={`life-${index}`}
                  sx={{ color: 'red', fontSize: '1.25rem', mr: 0.5 }}
                />
              ))}
            </Box>

            {!gameOver && (
              <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 1, minWidth: 'auto' }}>
                {isTimerVisible && (
                  <>
                    <IconButton onClick={togglePausePlay} color="primary" size="small" aria-label={isPaused ? "play" : "pause"} sx={{ p: 0.5, mr: 0.5 }}>
                      {isPaused ? <PlayArrowIcon fontSize="inherit" /> : <PauseIcon fontSize="inherit" />}
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: timeLeft <= 5 ? theme.palette.error.main : (timeLeft <= 10 ? theme.palette.warning.main : 'inherit'),
                      }}
                    >
                      {formatTime(timeLeft)}
                    </Typography>
                  </>
                )}
                <IconButton onClick={toggleTimerVisibility} color="primary" size="small" aria-label={isTimerVisible ? "hide timer" : "show timer"} sx={{ p: 0.5, ml: 0.5 }}>
                  {isTimerVisible ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                </IconButton>
              </Box>
            )}
            
            <Button
              size="small"
              variant="outlined"
              onClick={handleHintClick}
              disabled={isHintButtonDisabled || gameOver}
              sx={{ px: 1, flexShrink: 0 }}
            >
              Hint ({hints})
            </Button>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                flexShrink: 1,
                minWidth: 0,
                textAlign: 'right',
                [theme.breakpoints.down('sm')]: {
                  textAlign: 'center',
                },
              }}
            >
              Streak: {streak}{" "}
              {streak > 0 && <span style={{ color: theme.palette.success.main }}>(+{streak * 10}% bonus)</span>}
            </Typography>
          </Box>
        </>
      ) : ( // This is the "else" part for !gameOver, meaning gameOver is true
        gameOver && readyToShowGameOver ? ( // New condition here
          (() => {
            const isNewHighScore = score > highScore || (score === highScore && score > 0);
            return (
              <>
                <GameOver
                  score={score}
                  highScore={highScore}
                  restartGame={restartGame}
                  isNewHighScore={isNewHighScore}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
                  startIcon={<ErrorOutlineIcon />}
                  sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    py: 1.5,
                    px: 3,
                    color: 'white',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    borderRadius: '16px',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .4)',
                      background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 80%)',
                    },
                  }}
                >
                  See Your Mistakes & Learn
                </Button>
              </>
            );
          })()
        ) : (
          // Placeholder shown when gameOver is true but readyToShowGameOver is false
          <Box sx={{ 
            display: 'flex', 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '400px' // Ensures layout stability
          }}>
            {/* Optional: <Typography variant="h6">Loading Game Over...</Typography> */}
          </Box>
        )
      )}
      {selectedHandData && (
        <ChartDisplayModal
          open={modalOpen}
          onClose={handleCloseModal}
          wrongChoices={selectedHandData}
          title="Review Your Plays"
          situationKey={selectedHandData && selectedHandData.length > 0 ? selectedHandData[0].situationKey : ''}
          positionKey={selectedHandData && selectedHandData.length > 0 ? selectedHandData[0].positionKey : ''}
          decisionKey={selectedHandData && selectedHandData.length > 0 ? selectedHandData[0].decisionKey : ''}
          handNotation={selectedHandData && selectedHandData.length > 0 ? selectedHandData[0].handNotation : ''}
          yourChoice={selectedHandData && selectedHandData.length > 0 ? selectedHandData[0].yourChoice : ''}
        />
      )}
    </Box>
  );
};

export default PokerGameTab;
