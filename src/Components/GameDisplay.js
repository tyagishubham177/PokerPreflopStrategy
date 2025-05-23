import React, { useState, useEffect } from 'react'; // Imported useState, useEffect
import { Card, CardContent, Box, Typography, Button } from "@mui/material"; // Added Button
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import FavoriteIcon
import GameHeader from "./GameHeader";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";

const GameDisplay = (props) => {
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
    currentCorrectAction, // Destructure currentCorrectAction
    hints, // Destructure hints
    decrementHints, // Destructure decrementHints
    lastAnswerCorrectness, // Destructure lastAnswerCorrectness
    timeLeft, // Destructure timeLeft
  } = props;

  const [hintedAction, setHintedAction] = useState(null); // State for hinted action
  const [animationTrigger, setAnimationTrigger] = useState(null); // State for animation trigger

  // Effect to reset hintedAction when a new hand is dealt
  useEffect(() => {
    setHintedAction(null);
  }, [hand]);

  // Effect to trigger animation based on lastAnswerCorrectness
  useEffect(() => {
    let timer;
    if (lastAnswerCorrectness === 'CORRECT' || lastAnswerCorrectness === 'INCORRECT') {
      setAnimationTrigger(lastAnswerCorrectness);
      timer = setTimeout(() => {
        setAnimationTrigger(null);
      }, 1000); // Animation duration
    }
    return () => clearTimeout(timer); // Cleanup timeout
  }, [lastAnswerCorrectness]);

  const handleHintClick = () => {
    if (hints > 0 && !hintedAction) {
      decrementHints();
      setHintedAction(currentCorrectAction);
    }
  };

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
        border: animationTrigger === 'CORRECT' 
                  ? '3px solid green' 
                  : animationTrigger === 'INCORRECT' 
                  ? '3px solid red' 
                  : '3px solid transparent', // Default or no border
        transition: 'border 0.3s ease-in-out', // Smooth transition for border
      }}
    >
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
        {/* Container for Lives and Timer Display */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, px: {xs: 2, md: 3} }}> 
          {/* Lives Display */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 1, color: "text.secondary" }}>Lives:</Typography>
            <Box sx={{ display: 'flex' }}>
              {Array.from({ length: lives }).map((_, index) => (
                <FavoriteIcon key={index} sx={{ color: 'red', fontSize: '24px', marginRight: '4px' }} />
              ))}
            </Box>
          </Box>
          {/* Timer Display */}
          {!gameOver && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mr: 1, color: "text.secondary" }}>Time:</Typography>
              <Typography variant="h6" sx={{ color: timeLeft <= 10 && timeLeft > 5 ? "orange" : timeLeft <= 5 ? "red" : "text.primary", fontWeight: 'bold' }}>
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Hint Button Area */}
        {!gameOver && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <Button
              variant="contained"
              onClick={handleHintClick}
              disabled={hints <= 0 || !!hintedAction || gameOver}
              sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
            >
              Hint ({hints})
            </Button>
          </Box>
        )}

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
          hintedAction={hintedAction} // Pass hintedAction to PokerGameTab
        />
      </CardContent>
      <RulesDialog showRules={showRules} setShowRules={setShowRules} />
    </Card>
  );
};

export default GameDisplay;
