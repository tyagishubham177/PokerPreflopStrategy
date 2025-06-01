import React from 'react';
import {
  Paper,
  Typography,
  Button,
} from '@mui/material';

const AdvancedSettings = ({
  setShowShortcutModal,
  handleOpenStrategyModal,
  handleResetStrategy,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Advanced Settings
      </Typography>
      <Button
        variant="outlined"
        color="info"
        onClick={() => setShowShortcutModal(true)}
        fullWidth
        sx={{ mb: 1 }}
      >
        Configure Keyboard Shortcuts
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpenStrategyModal}
        fullWidth
        sx={{ mb: 1 }}
      >
        Customize Preflop Strategy
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleResetStrategy}
        fullWidth
        sx={{}}
      >
        Reset to Default Strategy
      </Button>
    </Paper>
  );
};

export default AdvancedSettings;
