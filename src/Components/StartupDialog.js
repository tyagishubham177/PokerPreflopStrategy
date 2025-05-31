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
        <DialogTitle>Welcome Back, Poker Ace!</DialogTitle>
        <DialogContent>
          <Typography>
            Ready to hit the tables? You can tweak the challenge or jump right in with your saved settings.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" sx={{ marginRight: '10px' }}>
            Adjust Challenge
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary">
            Deal Me In!
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    // Dialog for new users
    return (
      <Dialog open={true} PaperProps={{ style: { margin: '20px', padding: '20px' } }}>
        <DialogTitle>Ready to Master the Felt?</DialogTitle>
        <DialogContent>
          <Typography>
            Your poker adventure starts now! Choose your path:
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: '15px', paddingBottom: '20px', paddingTop: '20px' }}>
          <Button onClick={handleSettingsInternal} variant="contained" color="primary" fullWidth>
            Tailor Your Game
          </Button>
          <Button onClick={handleRulesInternal} variant="outlined" color="primary" fullWidth>
            Learn the Ropes
          </Button>
          <Button onClick={handlePlayInternal} variant="contained" color="secondary" fullWidth>
            Hit the Tables!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default StartupDialog;
