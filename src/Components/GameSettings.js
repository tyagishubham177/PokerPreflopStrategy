import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

const GameSettings = ({
  username,
  handleUsernameChange,
  difficulty,
  handleDifficultyChange,
  setIsInputFocused,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Game Settings
      </Typography>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        margin="normal"
        variant="outlined"
        // sx={{ mb: 2 }} // Removed to rely on margin="normal" for spacing
      />
      <Select
        fullWidth
        label="Difficulty"
        value={difficulty}
        onChange={(event) => handleDifficultyChange(event.target.value)}
        margin="normal" // Changed from "dense" to "normal"
        // sx={{}} // Removed as margin="normal" handles spacing
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
      </Select>
    </Paper>
  );
};

export default GameSettings;
