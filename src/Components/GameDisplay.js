import React, { useState, useEffect } from 'react'; 
import { Card, CardContent, Box, Typography, Button, Fade, useTheme } from "@mui/material"; // Added Fade, useTheme
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import CheckCircleOutlineIcon
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Import HighlightOffIcon
import GameHeader from "./GameHeader";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";

const GameDisplay = (props) => {
  const theme = useTheme(); // Add useTheme hook
  const {
    collapsed,
    onInfoClick,
    onLongPressStart,
    onLongPressEnd,
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
    showRules,
    setShowRules,
    currentCorrectAction, 
    // hints, decrementHints are removed from here as they are passed directly to PokerGameTab
    lastAnswerCorrectness, 
    // timeLeft is removed from here as it is passed directly to PokerGameTab
    hintedAction, 
    // New props from PokerGame.js to be passed down
    timeLeft, 
    hints, 
    handleHintClick, 
    isHintButtonDisabled,
    isPaused, // Added for pause/play
    togglePausePlay, // Added for pause/play
  } = props;

  const [feedbackTrigger, setFeedbackTrigger] = useState(null); // Renamed state variable

  // Effect 1: Set feedbackTrigger when lastAnswerCorrectness changes
  useEffect(() => {
    if (lastAnswerCorrectness) {
      setFeedbackTrigger(lastAnswerCorrectness);
    }
  }, [lastAnswerCorrectness]);

  // Effect 2: Manage the timer for feedbackTrigger visibility
  useEffect(() => {
    if (feedbackTrigger) {
      const timerId = setTimeout(() => {
        setFeedbackTrigger(null); // Hide feedback after 1.5 seconds
      }, 1500);
      return () => clearTimeout(timerId); // Cleanup timer
    }
  }, [feedbackTrigger]);

  // Removed handleHintClick as it's now in PokerGame.js

  if (collapsed) {
    return null;
  }

  return (
    <Card
      sx={{
        maxWidth: 650,
        width: "95%",
        boxShadow: 3,
        margin: "auto",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: {
          xs: "80vh",
          sm: "85vh",
        },
        position: 'relative', // Needed for absolute positioning of the feedback Box
        // Removed border styling
        // transition: 'border 0.3s ease-in-out', 
      }}
    >
      <Fade in={!!feedbackTrigger} timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: theme.spacing(3), // Increased padding for better visual
            backgroundColor: feedbackTrigger === 'CORRECT' 
                              ? 'rgba(46, 125, 50, 0.8)' // Darker green with opacity
                              : (feedbackTrigger === 'INCORRECT' 
                                ? 'rgba(211, 47, 47, 0.8)' // Darker red with opacity
                                : 'transparent'),
            borderRadius: theme.shape.borderRadius * 2, // More rounded
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex', // For centering icon and text
            flexDirection: 'column', // Stack icon and text vertically
            alignItems: 'center', // Center items horizontally
            boxShadow: theme.shadows[6], // Add some shadow
          }}
        >
          {feedbackTrigger === 'CORRECT' && (
            <>
              <CheckCircleOutlineIcon sx={{ color: theme.palette.common.white, fontSize: 60, mb: 1 }} />
              <Typography variant="h5" sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Correct!</Typography>
            </>
          )}
          {feedbackTrigger === 'INCORRECT' && (
            <>
              <HighlightOffIcon sx={{ color: theme.palette.common.white, fontSize: 60, mb: 1 }} />
              <Typography variant="h5" sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Incorrect!</Typography>
            </>
          )}
        </Box>
      </Fade>
      <GameHeader
        onInfoClick={onInfoClick}
        onLongPressStart={onLongPressStart}
        onLongPressEnd={onLongPressEnd}
      />
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Lives, Timer, and Hint Button UI elements removed from here */}

        <PokerGameTab
          gameOver={gameOver}
          score={score}
          highScore={highScore}
          hand={hand}
          situation={situation}
          position={position}
          availableActions={availableActions}
          makeDecision={makeDecision}
          lives={lives}
          streak={streak}
          restartGame={restartGame}
          wrongChoices={wrongChoices}
          hintedAction={hintedAction}
          // Pass new props for the bottom bar functionality
          timeLeft={timeLeft}
          hints={hints}
          handleHintClick={handleHintClick}
          isHintButtonDisabled={isHintButtonDisabled}
          isPaused={isPaused} // Pass isPaused
          togglePausePlay={togglePausePlay} // Pass togglePausePlay
        />
      </CardContent>
      <RulesDialog showRules={showRules} setShowRules={setShowRules} />
    </Card>
  );
};

export default GameDisplay;
