import React from 'react';
import { Typography, Button, Card, CardContent, Box, Chip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReplayIcon from '@mui/icons-material/Replay';
import { getGameOverMessage } from '../Constants/gameOverMessages';

const GameOver = ({ score, highScore, restartGame, isNewHighScore }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const message = getGameOverMessage(t, score, highScore, isNewHighScore);

  let MessageIcon = SentimentVeryDissatisfiedIcon; // Default icon
  const isSpecialSuccess = isNewHighScore || (score === highScore && score > 0);

  if (isSpecialSuccess) {
    MessageIcon = EmojiEventsIcon;
  }

  return (
    <Card sx={{
      maxWidth: 550,
      width: { xs: `calc(100% - ${theme.spacing(4)})`, sm: 'auto' },
      mx: 'auto',
      mt: 4, // Increased margin top for better spacing
      textAlign: 'center',
      px: { xs: 2, sm: 3 },
      py: 2,
      boxShadow: theme.shadows[4], // More elevation
      borderRadius: theme.shape.borderRadius * 2, // Softer corners
      backgroundColor: theme.palette.background.default, // Theme aware background
    }}>
      <CardContent sx={{ p: `${theme.spacing(2)} !important` }}> {/* Adjusted padding */}
        <Typography variant="h3" component="div" sx={{
          mb: 2,
          fontWeight: 'bold',
          color: 'primary.main',
        }}>
          {t('gameOver')}
        </Typography>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          p: 2,
          borderRadius: theme.shape.borderRadius,
          background: isSpecialSuccess
            ? 'linear-gradient(45deg, #66bb6a, #43a047)' // Greenish gradient for success
            : theme.palette.grey[200],
          color: isSpecialSuccess ? 'white' : theme.palette.text.primary,
        }}>
          <MessageIcon sx={{
            fontSize: 36, // Slightly adjusted size
            mr: 1.5,
            color: isSpecialSuccess ? 'white' : theme.palette.text.secondary,
          }} />
          <Typography variant="h6" sx={{ // Adjusted for better fit with icon
            fontWeight: 'medium',
          }}>
            {message}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          {isNewHighScore ? (
            <Chip
              label={t('newHighScoreLabel', { score })}
              sx={{
                fontSize: '1.1rem',
                padding: '10px 16px',
                fontWeight: 'bold',
                backgroundColor: 'warning.light', // Celebratory color for new high score
                color: theme.palette.getContrastText(theme.palette.warning.light),
                boxShadow: theme.shadows[2],
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
              <Chip
                label={t('yourScoreLabel', { score })}
                sx={{
                  fontSize: '1rem',
                  padding: '8px 12px',
                  fontWeight: 'medium',
                  backgroundColor: 'info.main',
                  color: 'white',
                  boxShadow: theme.shadows[1],
                }}
              />
              <Chip
                label={t('highScoreLabel', { highScore })}
                variant="outlined"
                sx={{
                  fontSize: '1rem',
                  padding: '8px 12px',
                  fontWeight: 'medium',
                  borderColor: 'info.dark',
                  color: 'info.dark',
                  borderWidth: 1, // Standard outline
                }}
              />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={restartGame}
          startIcon={<ReplayIcon />}
          size="large"
          sx={{
            fontWeight: 'bold',
            borderRadius: '20px', // More rounded
            padding: '10px 25px', // Generous padding
            boxShadow: theme.shadows[3],
            transition: 'transform 0.2s ease-in-out, background-color 0.2s ease',
            backgroundColor: isSpecialSuccess ? 'success.main' : 'primary.main', // success for new HS, primary otherwise
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: isSpecialSuccess ? 'success.dark' : 'primary.dark',
            }
          }}
        >
          {t('playAgain')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameOver;