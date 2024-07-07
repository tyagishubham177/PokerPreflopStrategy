import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSaveSettings = () => {
    // Here you would typically save these settings to your game state or local storage
    console.log('Settings saved:', { soundEnabled, username, difficulty });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Game Settings</Typography>
      
      <FormControlLabel
        control={<Switch checked={soundEnabled} onChange={handleSoundToggle} />}
        label="Sound Effects"
      />

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
      />

      <TextField
        fullWidth
        select
        label="Difficulty"
        value={difficulty}
        onChange={handleDifficultyChange}
        margin="normal"
        SelectProps={{
          native: true,
        }}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </TextField>

      <Button variant="contained" color="primary" onClick={handleSaveSettings} sx={{ mt: 2 }}>
        Save Settings
      </Button>
    </Box>
  );
};

export default SettingsTab;