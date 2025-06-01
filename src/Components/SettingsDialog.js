import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const SettingsDialog = ({ showSettings, setShowSettings, editedStrategy, handleStrategyChange, saveStrategy }) => (
  <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
    <DialogTitle>Settings</DialogTitle>
    <DialogContent>
      <TextField
        multiline
        rows={10}
        fullWidth
        value={editedStrategy}
        onChange={handleStrategyChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setShowSettings(false)}>Cancel</Button>
      <Button onClick={saveStrategy} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default SettingsDialog;