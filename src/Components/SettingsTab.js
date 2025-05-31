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
  Slider,
} from "@mui/material";
import StrategyCustomizationModal from './StrategyCustomizationModal.js';
import ShortcutConfigModal from './ShortcutConfigModal'; // Import the new modal
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
  setShortcutConfig,
  isInputFocused,
  setIsInputFocused
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
  const [soundVolume, setSoundVolume] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.soundVolume !== undefined ? settings.soundVolume : 0.5;
      }
    } catch (error) {
      console.error("Failed to load sound settings from localStorage:", error);
    }
    return 0.5;
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
  const [showShortcutModal, setShowShortcutModal] = useState(false); // State for the new modal

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

  // handleShortcutKeyChange is removed from here, as it's in ShortcutConfigModal

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
      // Also save soundVolume when sound is toggled
      settings.soundVolume = soundVolume;
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save sound settings to localStorage:", error);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setSoundVolume(newValue);
    // Save volume immediately on change
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      let settings = {};
      if (savedSettings) {
        settings = JSON.parse(savedSettings);
      }
      settings.soundVolume = newValue;
      settings.soundEnabled = soundEnabled; // ensure soundEnabled is also saved
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save sound volume to localStorage:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSaveSettings = () => {
    const settingsToSave = {
      soundEnabled,
      soundVolume,
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
      <Typography id="sound-volume-slider" gutterBottom sx={{ color: "text.secondary", mt: 1 }}>
        Sound Volume
      </Typography>
      <Slider
        value={soundVolume}
        onChange={handleVolumeChange}
        aria-labelledby="sound-volume-slider"
        min={0}
        max={1}
        step={0.01}
        disabled={!soundEnabled}
        sx={{ mt: 0, mb: 2 }}
      />
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
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

      {/* Button to open ShortcutConfigModal */}
      <Button
        variant="outlined"
        color="info" // Using 'info' color for distinction, can be 'primary' or 'secondary'
        onClick={() => setShowShortcutModal(true)}
        fullWidth
        sx={{ mt: 2, mb: 1 }}
      >
        Configure Keyboard Shortcuts
      </Button>

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

      <ShortcutConfigModal
        open={showShortcutModal}
        onClose={() => setShowShortcutModal(false)}
        shortcutConfig={shortcutConfig}
        setShortcutConfig={setShortcutConfig}
      />
    </Box>
  );
};

export default SettingsTab;
