import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SOUND_SETTINGS_LS_KEY } from '../Constants/StorageKeys';

// Placeholder for RulesDialog and SettingsPanel if needed later for direct display
// For now, we assume App.js will handle showing them after this dialog completes.
// import RulesDialog from './RulesDialog'; // If direct rendering is chosen
// import SettingsPanel from './SettingsPanel'; // If direct rendering is chosen

const StartupDialog = ({ onPlay, onSettings, onRules, hasExistingSettings }) => {
  const { t } = useTranslation();

  let username = '';
  try {
    const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.username) {
        username = parsed.username;
      }
    }
  } catch (e) {
    console.error('Failed to read username from localStorage', e);
  }
  const hasUsername = username && username.trim() !== '';
  // These states would be used if we were to show Rules/Settings directly from this component
  // const [showRules, setShowRules] = React.useState(false);
  // const [showSettings, setShowSettings] = React.useState(false);

  const handlePlayInternal = () => { // Renamed to avoid conflict with prop if it was also named handlePlay
    onPlay(); // Signal App.js to proceed to PokerGame
  };

  const handleSettingsInternal = () => { // Renamed for clarity
    onSettings(); // Signal App.js to show settings
  };

  const handleRulesInternal = () => { // Renamed for clarity
    onRules(); // Signal App.js to show rules
  };

  if (hasExistingSettings) {
    // Dialog for users with existing settings
    return (
      <Dialog open={true} PaperProps={{ style: { margin: '20px', padding: '20px' } }}>
        <DialogTitle>{hasUsername ? t('welcomeBackTitleWithName', { username }) : t('welcomeBackTitle')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('welcomeBackBody')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" sx={{ marginRight: '10px' }}>
            {t('adjustChallenge')}
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary">
            {t('dealMeIn')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    // Dialog for new users
    return (
      <Dialog open={true} PaperProps={{ style: { margin: '20px', padding: '20px' } }}>
        <DialogTitle>{t('welcomeTitle')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('welcomeBody')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: '15px', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" fullWidth>
            {t('tailorYourGame')}
          </Button>
          <Button onClick={handleRulesInternal} variant="outlined" color="primary" fullWidth>
            {t('learnTheRopes')}
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary" fullWidth>
            {t('hitTheTables')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default StartupDialog;
