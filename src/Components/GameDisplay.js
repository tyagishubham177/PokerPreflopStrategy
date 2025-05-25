import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, Typography, Button, Fade, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GameHeader from "./GameHeader";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";

const GameDisplay = (props) => {
  const theme = useTheme();
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
    lastAnswerCorrectness,
    hintedAction,
    timeLeft,
    hints,
    handleHintClick,
    isHintButtonDisabled,
    isPaused,
    togglePausePlay,
    playSound,
  } = props;

  const [feedbackTrigger, setFeedbackTrigger] = useState(null);

  useEffect(() => {
    if (lastAnswerCorrectness) {
      setFeedbackTrigger(lastAnswerCorrectness);
      if (lastAnswerCorrectness === 'CORRECT') {
        console.log('GameDisplay: Playing correct_decision sound.');
        playSound('correct_decision');
      } else if (lastAnswerCorrectness === 'INCORRECT') {
        console.log('GameDisplay: Playing wrong_decision sound.');
        playSound('wrong_decision');
      }
    }
  }, [lastAnswerCorrectness, playSound]);

  useEffect(() => {
    if (feedbackTrigger) {
      const timerId = setTimeout(() => {
        setFeedbackTrigger(null);
      }, 1500);
      return () => clearTimeout(timerId);
    }
  }, [feedbackTrigger]);

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
        position: 'relative',
      }}
    >
      <Fade in={!!feedbackTrigger} timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: theme.spacing(3),
            backgroundColor: feedbackTrigger === 'CORRECT'
                              ? 'rgba(46, 125, 50, 0.8)'
                              : (feedbackTrigger === 'INCORRECT'
                                ? 'rgba(211, 47, 47, 0.8)'
                                : 'transparent'),
            borderRadius: theme.shape.borderRadius * 2,
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: theme.shadows[6],
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
          timeLeft={timeLeft}
          hints={hints}
          handleHintClick={handleHintClick}
          isHintButtonDisabled={isHintButtonDisabled}
          isPaused={isPaused}
          togglePausePlay={togglePausePlay}
        />
      </CardContent>
      <RulesDialog showRules={showRules} setShowRules={setShowRules} />
    </Card>
  );
};

export default GameDisplay;
