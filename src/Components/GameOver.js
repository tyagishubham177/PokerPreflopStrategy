import React from 'react';
import { Typography, Button } from '@mui/material';

const GameOver = ({ score, highScore, restartGame }) => (
  <>
    <Typography variant="h5" align="center" sx={{ mb: 2 }}>
      Game Over!
    </Typography>
    <Typography align="center" sx={{ mb: 2 }}>
      Your score: {score}
      <br />
      High score: {highScore}
    </Typography>
    <Button variant="contained" color="primary" onClick={restartGame}>
      Play Again
    </Button>
  </>
);

export default GameOver;