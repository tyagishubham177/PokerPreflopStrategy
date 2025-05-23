import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BottomGameBar = ({
  lives,
  timeLeft,
  hints,
  onHintClick,
  isHintDisabled,
}) => {
  const theme = useTheme();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  let timerColor = theme.palette.common.white; // Default for dark background
  if (theme.palette.mode === 'light') { // Adjust if background is light
    timerColor = theme.palette.text.primary; 
  }
  if (timeLeft <= 5) {
    timerColor = theme.palette.error.main;
  } else if (timeLeft <= 10) {
    timerColor = theme.palette.warning.main;
  }


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.primary.main, // Using primary.main for a darker bar
        padding: theme.spacing(1, 2),
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Lives Display section */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: theme.palette.common.white, mr: 1 }}> {/* White text for dark bar */}
          Lives:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {Array.from({ length: lives }).map((_, index) => (
            <FavoriteIcon
              key={`life-${index}`}
              sx={{ color: 'red', marginRight: theme.spacing(0.5), fontSize: '20px' }}
            />
          ))}
        </Box>
      </Box>

      {/* Timer Display section */}
      <Typography variant="body1" sx={{ color: timerColor, fontWeight: 'bold' }}>
        {formatTime(timeLeft)}
      </Typography>

      {/* Hint Button section */}
      <Button
        variant="contained"
        color="secondary" // Secondary color for contrast on primary.main
        onClick={onHintClick}
        disabled={isHintDisabled}
        sx={{
          // Style to ensure visibility if secondary is not contrasting enough
          // color: theme.palette.secondary.contrastText, 
          // backgroundColor: theme.palette.secondary.main,
        }}
      >
        Hint ({hints})
      </Button>
    </Box>
  );
};

export default BottomGameBar;
