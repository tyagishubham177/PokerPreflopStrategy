import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleInteraction = () => {
    alert("The Settings are under development! Stay Tuned for updates!!");
  };

  const handleSoundToggle = () => {
    handleInteraction();
    setSoundEnabled(!soundEnabled);
  };

  const handleUsernameChange = (event) => {
    handleInteraction();
    setUsername(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    handleInteraction();
    setDifficulty(event.target.value);
  };

  const handleSaveSettings = () => {
    handleInteraction();
    console.log("Settings saved:", { soundEnabled, username, difficulty });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Game Settings
      </Typography>

      <FormControlLabel
        control={<Switch checked={soundEnabled} onChange={handleSoundToggle} color="primary" />}
        label="Sound Effects"
        sx={{ my: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
      />

      <Select
        fullWidth
        label="Difficulty"
        value={difficulty}
        onChange={handleDifficultyChange}
        margin="dense"
        sx={{ mb: 2 }}
      >
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>

      <Button variant="contained" color="primary" onClick={handleSaveSettings} sx={{ mt: 2, width: "100%" }}>
        Save Settings
      </Button>
    </Box>
  );
};

export default SettingsTab;
