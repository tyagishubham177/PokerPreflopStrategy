import React from 'react';
import { Typography, Button, Card, CardContent, Box, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReplayIcon from '@mui/icons-material/Replay';

const GameOver = ({ score, highScore, restartGame, isNewHighScore }) => {
  let message;
  let MessageIcon;

  if (isNewHighScore) {
    message = "Wow! New High Score!";
    MessageIcon = EmojiEventsIcon;
  } else if (score === highScore && score > 0) {
    message = "So close! You matched the high score!";
    MessageIcon = EmojiEventsIcon;
  } else {
    message = "Better luck next time!";
    MessageIcon = SentimentVeryDissatisfiedIcon;
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
      backgroundColor: 'grey.100' // New Card background color
    }}>
      <CardContent sx={{ p: '0 !important' }}>
        <Typography variant="h4" component="div" sx={{
          mb: 2,
          fontWeight: 'bold',
          color: 'grey.700' // New Title color
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
          // New Message Box background
          background: isNewHighScore ? 'linear-gradient(45deg, #26A69A, #66BB6A)' : 'blueGrey.100'
        }}>
          <MessageIcon sx={{
            fontSize: 40,
            mr: 1,
            // New Message Icon color
            color: isNewHighScore ? 'white' : 'blueGrey.500'
          }} />
          <Typography variant="h6" sx={{
            // New Message Typography color
            color: isNewHighScore ? 'white' : 'blueGrey.700',
            fontWeight: 'medium'
          }}>{message}</Typography>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-around' }}>
          <Chip
            label={`Your Score: ${score}`}
            // Removed color="primary"
            sx={{
              fontSize: '1rem',
              padding: '8px 12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              mr: 1,
              // New "Your Score" Chip colors
              backgroundColor: 'teal.600',
              color: 'white'
            }}
          />
          <Chip
            label={`High Score: ${highScore}`}
            variant="outlined"
            // Removed color="secondary"
            sx={{
              fontSize: '1rem',
              padding: '8px 12px',
              fontWeight: 'bold',
              // New "High Score" Chip colors
              borderColor: 'teal.700',
              color: 'teal.700',
              borderWidth: 2
            }}
          />
        </Box>
        <Button
          variant="contained"
          // Removed color="secondary"
          onClick={restartGame}
          startIcon={<ReplayIcon />}
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '16px',
            padding: '8px 20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease-in-out',
            // New Button colors
            backgroundColor: 'teal.500',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: 'teal.700' // New hover background color
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