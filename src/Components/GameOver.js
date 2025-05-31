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
  } else if (score === highScore && highScore > 0) {
    message = "So close! You matched the high score!";
    MessageIcon = EmojiEventsIcon;
  } else {
    message = "Better luck next time!";
    MessageIcon = SentimentVeryDissatisfiedIcon;
  }

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4, textAlign: 'center', p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h4" component="div" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Game Over!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, p:1, borderRadius: 1, background: isNewHighScore ? 'linear-gradient(45deg, #FFD700, #FF8C00)' : 'action.hover' }}>
          <MessageIcon sx={{ fontSize: 40, mr: 1.5, color: isNewHighScore ? 'white' : 'text.secondary' }} />
          <Typography variant="h6" sx={{ color: isNewHighScore ? 'white' : 'text.primary', fontWeight: 'medium' }}>{message}</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-around' }}>
          <Chip
            label={`Your Score: ${score}`}
            color="primary"
            sx={{
              fontSize: '1rem',
              padding: '10px 15px',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          />
          <Chip
            label={`High Score: ${highScore}`}
            variant="outlined"
            color="secondary"
            sx={{
              fontSize: '1rem',
              padding: '10px 15px',
              fontWeight: 'bold',
              borderColor: 'secondary.main',
              borderWidth: 2
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={restartGame}
          startIcon={<ReplayIcon />}
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '10px 25px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
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