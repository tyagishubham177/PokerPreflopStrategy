import React from 'react';
import { Typography, Button, Card, CardContent, Box, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReplayIcon from '@mui/icons-material/Replay';

const GameOver = ({ score, highScore, restartGame, isNewHighScore }) => {
  let message;
  let MessageIcon;

  // Logic for message and icon (remains the same)
  if (isNewHighScore) {
    message = "Wow! New High Score!";
    MessageIcon = EmojiEventsIcon;
  } else if (score === highScore && score > 0) {
    // This case is now also covered by isNewHighScore based on PokerGameTab logic
    // but GameOver component itself receives a single boolean.
    // If isNewHighScore is true, "Wow! New High Score!" will be shown.
    // If isNewHighScore is false, and score === highScore, this message will be shown.
    // This means the PokerGameTab logic might need refinement if "Matched" should have a different message
    // than "New" but still use the "New High Score" UI theme.
    // For now, proceeding as if isNewHighScore = true means "Wow! New High Score!" message.
    message = "So close! You matched the high score!";
    MessageIcon = EmojiEventsIcon;
  } else {
    message = "Better luck next time!";
    MessageIcon = SentimentVeryDissatisfiedIcon;
  }
  // Correcting message logic based on isNewHighScore prop directly for consistency with UI theme
  if (isNewHighScore) {
    message = "Wow! New High Score!";
    MessageIcon = EmojiEventsIcon;
  } else {
     // Only other cases are "matched but not new (e.g. score=0, hs=0)" or "worse score"
    message = "Better luck next time!"; // Default if not a new/matched high score
    if (score === highScore && score > 0 && !isNewHighScore) {
      // This specific branch might not be hit if PokerGameTab always sets isNewHighScore=true for matched scores.
      // However, if it could be false, this message is more specific.
      message = "So close! You matched the high score!";
    }
    MessageIcon = SentimentVeryDissatisfiedIcon;
    if (score === highScore && score > 0) MessageIcon = EmojiEventsIcon; // Keep celebratory icon for matched
  }


  return (
    <Card sx={{
      maxWidth: 400,
      margin: 'auto',
      mt: 2,
      textAlign: 'center',
      p: 1.5,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'grey.100'
    }}>
      <CardContent sx={{ p: '0 !important' }}>
        <Typography variant="h4" component="div" sx={{
          mb: 2,
          fontWeight: 'bold',
          color: 'grey.700'
        }}>
          Game Over!
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          p: 0.5,
          borderRadius: 1,
          background: isNewHighScore ? 'linear-gradient(45deg, #FFCA28, #FFA726)' : 'blueGrey.100'
        }}>
          <MessageIcon sx={{
            fontSize: 40,
            mr: 1,
            color: isNewHighScore ? 'white' : 'blueGrey.500'
          }} />
          <Typography variant="h6" sx={{
            color: isNewHighScore ? 'white' : 'blueGrey.700',
            fontWeight: 'medium'
          }}>{message}</Typography>
        </Box>

        <Box sx={{
          mb: 2,
          display: 'flex',
          justifyContent: isNewHighScore ? 'center' : 'space-around'  // Conditional centering
        }}>
          {isNewHighScore ? (
            <Chip
              label={`New High Score: ${score}`}
              sx={{
                fontSize: '1rem',
                padding: '8px 12px',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                backgroundColor: 'amber.700', // New High Score Chip color
                color: 'white'
              }}
            />
          ) : (
            <>
              <Chip
                label={`Your Score: ${score}`}
                sx={{
                  fontSize: '1rem',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  mr: 1,
                  backgroundColor: 'teal.600',
                  color: 'white'
                }}
              />
              <Chip
                label={`High Score: ${highScore}`}
                variant="outlined"
                sx={{
                  fontSize: '1rem',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  borderColor: 'teal.700',
                  color: 'teal.700',
                  borderWidth: 2
                }}
              />
            </>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={restartGame}
          startIcon={<ReplayIcon />}
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '16px',
            padding: '8px 20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease-in-out',
            backgroundColor: isNewHighScore ? 'orange.600' : 'teal.500', // Conditional button color
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: isNewHighScore ? 'orange.800' : 'teal.700' // Conditional hover color
            }
          }}
        >
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameOver;