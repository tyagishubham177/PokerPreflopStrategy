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
    currentCorrectAction, // Destructure currentCorrectAction (no longer used for hint logic here)
    hints, // Destructure hints (no longer used for hint logic here)
    decrementHints, // Destructure decrementHints (no longer used for hint logic here)
    lastAnswerCorrectness, // Destructure lastAnswerCorrectness
    timeLeft, // Destructure timeLeft (no longer displayed here)
    hintedAction, // Receive hintedAction as a prop
  } = props;

  const [feedbackTrigger, setFeedbackTrigger] = useState(null); // Renamed state variable

  // Effect to trigger feedback based on lastAnswerCorrectness
  useEffect(() => {
    let timer;
    if (lastAnswerCorrectness === 'CORRECT' || lastAnswerCorrectness === 'INCORRECT') {
      setFeedbackTrigger(lastAnswerCorrectness); // Use renamed setter
      timer = setTimeout(() => {
        setFeedbackTrigger(null); // Use renamed setter
      }, 1500); // Updated timeout to 1500ms
    }
    return () => clearTimeout(timer); // Cleanup timeout
  }, [lastAnswerCorrectness]);

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
          lives={lives} // lives is still passed for other potential uses in PokerGameTab
          streak={streak}
          restartGame={restartGame}
          wrongChoices={wrongChoices}
          hintedAction={hintedAction} // Pass hintedAction to PokerGameTab
        />
      </CardContent>
      <RulesDialog showRules={showRules} setShowRules={setShowRules} />
    </Card>
  );
};

export default GameDisplay;
