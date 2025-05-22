import React, { useState, useEffect } from "react"; 
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
import StrategyCustomizationModal from './StrategyCustomizationModal.js';
import { initialPokerStrategy } from '../Constants/InitialStrategy.js';
import { POSITION_LABELS } from '../Constants/GameLabels.js';

const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  const [currentStrategy, setCurrentStrategy] = useState(() => {
    try {
      const savedStrategy = localStorage.getItem(CUSTOM_STRATEGY_LS_KEY);
      if (savedStrategy) {
        // Directly parse and use the saved strategy if it exists
        return JSON.parse(savedStrategy); 
      }
    } catch (error) {
      console.error("Failed to load custom strategy from localStorage:", error);
      // If there's an error (e.g., corrupted data), fall back to initialPokerStrategy
    }
    // If no saved strategy or if there was an error, return the default initial strategy
    return initialPokerStrategy; 
  });


  const handleInteraction = () => {};

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

  const handleOpenStrategyModal = () => {
    setShowStrategyModal(true);
  };

  const handleCloseStrategyModal = () => {
    setShowStrategyModal(false);
  };

  const handleSaveStrategy = (modifiedStrategies) => {
    try {
      // The modifiedStrategies from the modal is already in the correct, full format.
      // Directly stringify and save to localStorage.
      localStorage.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(modifiedStrategies));
      // Directly set it to the currentStrategy state.
      setCurrentStrategy(modifiedStrategies);
      console.log("Custom strategy saved to localStorage and state updated.");
    } catch (error) {
      console.error("Failed to save custom strategy to localStorage:", error);
    }
    handleCloseStrategyModal();
  };

  const handleResetStrategy = () => {
    try {
      localStorage.removeItem(CUSTOM_STRATEGY_LS_KEY);
      setCurrentStrategy(initialPokerStrategy); 
      console.log("Custom strategy reset to default.");
    } catch (error) {
      console.error("Failed to reset custom strategy:", error);
    }
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

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', mt: 3, mb:1, color: "text.secondary" }}>
        Strategy Settings
      </Typography>

      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleOpenStrategyModal} 
        sx={{ mb: 1, width: "100%" }}
      >
        Customize Initial Strategy
      </Button>

      <Button 
        variant="outlined" 
        color="warning" 
        onClick={handleResetStrategy} 
        sx={{ mb: 2, width: "100%" }}
      >
        Reset to Default Strategy
      </Button>

      <Button variant="contained" color="primary" onClick={handleSaveSettings} sx={{ width: "100%" }}>
        Save All Settings
      </Button>

      <StrategyCustomizationModal
        open={showStrategyModal}
        onClose={handleCloseStrategyModal}
        initialStrategy={currentStrategy} 
        onSave={handleSaveStrategy}
      />
    </Box>
  );
};

export default SettingsTab;
