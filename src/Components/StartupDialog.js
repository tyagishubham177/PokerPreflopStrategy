import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

// Placeholder for RulesDialog and SettingsPanel if needed later for direct display
// For now, we assume App.js will handle showing them after this dialog completes.
// import RulesDialog from './RulesDialog'; // If direct rendering is chosen
// import SettingsPanel from './SettingsPanel'; // If direct rendering is chosen

const StartupDialog = ({ onPlay, onSettings, onRules, hasExistingSettings }) => {
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
        <DialogTitle>Welcome Back!</DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to change the difficulty level, or just lock and load with existing settings?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" sx={{ marginRight: '10px' }}>
            Change Difficulty
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary">
            Lock and Load!
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    // Dialog for new users
    return (
      <Dialog open={true} PaperProps={{ style: { margin: '20px', padding: '20px' } }}>
        <DialogTitle>Welcome to the Poker Trainer!</DialogTitle>
        <DialogContent>
          <Typography>
            How would you like to start?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: '15px', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" fullWidth>
            Customize Game in Settings
          </Button>
          <Button onClick={handleRulesInternal} variant="outlined" color="primary" fullWidth>
            Read the Rules
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary" fullWidth>
            Play and Go!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default StartupDialog;
