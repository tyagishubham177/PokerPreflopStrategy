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
// Import DIFFICULTY_LEVELS to map over for MenuItems if needed, or use hardcoded values
import { DIFFICULTY_LEVELS } from '../Constants/GameConstants';


const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';
const SOUND_SETTINGS_LS_KEY = 'soundSettings';

// Update props to include difficulty and handleDifficultyChange
const SettingsTab = ({ difficulty, handleDifficultyChange }) => { 
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.soundEnabled !== undefined ? settings.soundEnabled : true;
      }
    } catch (error) {
      console.error("Failed to load sound settings from localStorage:", error);
    }
    return true; // Default to true if nothing is saved or an error occurs
  });
  const [username, setUsername] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.username || "";
      }
    } catch (error) {
      console.error("Failed to load username from localStorage:", error);
    }
    return ""; // Default to empty string
  });
  // Removed local difficulty state: const [difficulty, setDifficulty] = useState("medium");
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
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      let settings = {};
      if (savedSettings) {
        settings = JSON.parse(savedSettings);
      }
      settings.soundEnabled = newSoundEnabled;
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save sound settings to localStorage:", error);
    }
    // handleInteraction(); // This can be kept if it serves other purposes
  };

  const handleUsernameChange = (event) => {
    handleInteraction();
    setUsername(event.target.value);
  };

  // Removed local handleDifficultyChange function
  // const handleDifficultyChange = (event) => {
  //   handleInteraction();
  //   setDifficulty(event.target.value);
  // };

  const handleSaveSettings = () => {
    handleInteraction(); // This can be kept
    const settingsToSave = {
      soundEnabled,
      username, // Assuming username is still part of settings
      difficulty, // Assuming difficulty is part of settings
      // Potentially other settings like customPokerStrategy if managed here
    };
    try {
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settingsToSave));
      // If other settings (like username, difficulty) are stored separately, save them too.
      // For now, this focuses on putting soundEnabled within a 'soundSettings' object.
      // If username and difficulty are part of the same object, this is fine.
      // Otherwise, they might need their own localStorage keys or be combined.
      // Let's assume for now they are part of this 'soundSettings' object for simplicity.
      console.log("Settings saved:", settingsToSave);
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
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
        value={difficulty} // Use difficulty prop
        onChange={(event) => handleDifficultyChange(event.target.value)} // Use handleDifficultyChange prop
        margin="dense"
        sx={{ mb: 2 }}
      >
        {/* Ensure MenuItem values are capitalized to match DIFFICULTY_LEVELS keys */}
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
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
        Customize Preflop Strategy
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
