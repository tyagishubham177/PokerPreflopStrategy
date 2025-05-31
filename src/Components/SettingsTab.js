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
import { DIFFICULTY_LEVELS } from '../Constants/GameConstants';


const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';
const SOUND_SETTINGS_LS_KEY = 'soundSettings';

const SettingsTab = ({
  difficulty,
  handleDifficultyChange,
  onPanelClose,
  shortcutConfig,
  setShortcutConfig
}) => {
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
    return true;
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
    return "";
  });
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  const [currentStrategy, setCurrentStrategy] = useState(() => {
    try {
      const savedStrategy = localStorage.getItem(CUSTOM_STRATEGY_LS_KEY);
      if (savedStrategy) {
        return JSON.parse(savedStrategy);
      }
    } catch (error) {
      console.error("Failed to load custom strategy from localStorage:", error);
    }
    return initialPokerStrategy;
  });

  const handleShortcutKeyChange = (actionName, newKey) => {
    // Ensure newKey is a single character and lowercase, or handle empty string if necessary
    const processedKey = newKey ? newKey.charAt(0).toLowerCase() : '';
    // If allowing empty to clear or revert, add logic here. For now, always sets.
    if (setShortcutConfig && processedKey) { // Only update if there's a key
      setShortcutConfig(prevConfig => ({
        ...prevConfig,
        [actionName]: processedKey,
      }));
    } else if (setShortcutConfig && !processedKey) { // Handle empty input - perhaps revert or clear
        // Option: Revert to default or do nothing. For now, let's clear it or set to a specific placeholder if desired.
        // Or, to prevent clearing: if (!processedKey) return;
        setShortcutConfig(prevConfig => ({
            ...prevConfig,
            [actionName]: '', // Allow clearing for now, user might be in process of changing
        }));
    }
  };

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
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSaveSettings = () => {
    const settingsToSave = {
      soundEnabled,
      username,
      difficulty,
    };
    try {
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settingsToSave));
      console.log("Settings saved:", settingsToSave);
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
    if (onPanelClose) {
      onPanelClose();
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
      localStorage.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(modifiedStrategies));
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
        onChange={(event) => handleDifficultyChange(event.target.value)}
        margin="dense"
        sx={{ mb: 2 }}
      >
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
      </Select>

      {/* Keyboard Shortcuts Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', mt: 3, mb: 1, color: "text.secondary" }}>
        Keyboard Shortcuts
      </Typography>
      <TextField
        fullWidth
        label="Hint Key"
        value={shortcutConfig?.hint || ''}
        onChange={(e) => handleShortcutKeyChange('hint', e.target.value)}
        variant="outlined"
        margin="dense"
        sx={{ mb: 1 }}
        inputProps={{ maxLength: 1 }}
      />
      <TextField
        fullWidth
        label="Pause/Play Key"
        value={shortcutConfig?.pause || ''}
        onChange={(e) => handleShortcutKeyChange('pause', e.target.value)}
        variant="outlined"
        margin="dense"
        sx={{ mb: 1 }}
        inputProps={{ maxLength: 1 }}
      />
      <TextField
        fullWidth
        label="Settings Key"
        value={shortcutConfig?.settings || ''}
        onChange={(e) => handleShortcutKeyChange('settings', e.target.value)}
        variant="outlined"
        margin="dense"
        sx={{ mb: 1 }}
        inputProps={{ maxLength: 1 }}
      />
      <TextField
        fullWidth
        label="Rules Key"
        value={shortcutConfig?.rules || ''}
        onChange={(e) => handleShortcutKeyChange('rules', e.target.value)}
        variant="outlined"
        margin="dense"
        sx={{ mb: 2 }} // A bit more margin before the next section
        inputProps={{ maxLength: 1 }}
      />

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
