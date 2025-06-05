import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Divider,
  // Removed Paper, Typography, TextField, Switch, FormControlLabel, Select, MenuItem, Slider as they are now in child components
} from "@mui/material";
import StrategyCustomizationModal from './StrategyCustomizationModal.js';
import ShortcutConfigModal from './ShortcutConfigModal'; // Import the new modal
import SoundSettings from './SoundSettings.js'; // Import new component
import GameSettings from './GameSettings.js'; // Import new component
import AdvancedSettings from './AdvancedSettings.js'; // Import new component
import { initialPokerStrategy } from '../Constants/InitialStrategy.js';
import { POSITION_LABELS } from '../Constants/GameLabels.js';
import { DIFFICULTY_LEVELS } from '../Constants/GameConstants';
import { CUSTOM_STRATEGY_LS_KEY, SOUND_SETTINGS_LS_KEY } from '../Constants/StorageKeys';
import { ThemeContext } from '../Context/ThemeContext';
import i18n from '../i18n';

const SettingsTab = ({
  difficulty,
  handleDifficultyChange,
  onPanelClose,
  shortcutConfig,
  setShortcutConfig,
  isInputFocused,
  setIsInputFocused
}) => {
  const { t } = useTranslation();
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
  const [language, setLanguage] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.language || 'en';
      }
    } catch (error) {
      console.error('Failed to load language from localStorage:', error);
    }
    return 'en';
  });
  const [fontFamily, setFontFamily] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.fontFamily || "'Roboto', sans-serif";
      }
    } catch (error) {
      console.error('Failed to load font from localStorage:', error);
    }
    return "'Roboto', sans-serif";
  });
  const { themeName, setThemeName } = useContext(ThemeContext);
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

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    document.documentElement.style.setProperty('--app-font-family', fontFamily);
  }, [fontFamily]);

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

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      let settings = {};
      if (savedSettings) {
        settings = JSON.parse(savedSettings);
      }
      settings.language = lang;
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  };

  const handleFontChange = (font) => {
    setFontFamily(font);
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      let settings = {};
      if (savedSettings) {
        settings = JSON.parse(savedSettings);
      }
      settings.fontFamily = font;
      localStorage.setItem(SOUND_SETTINGS_LS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save font to localStorage:', error);
    }
  };

  const handleThemeChange = (theme) => {
    setThemeName(theme);
  };

  const handleSaveSettings = () => {
    const settingsToSave = {
      soundEnabled,
      soundVolume,
      username,
      difficulty,
      language,
      fontFamily,
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
      <SoundSettings
        soundEnabled={soundEnabled}
        handleSoundToggle={handleSoundToggle}
        soundVolume={soundVolume}
        handleVolumeChange={handleVolumeChange}
      />

      <GameSettings
        username={username}
        handleUsernameChange={handleUsernameChange}
        difficulty={difficulty}
        handleDifficultyChange={handleDifficultyChange}
        language={language}
        handleLanguageChange={handleLanguageChange}
        fontFamily={fontFamily}
        handleFontChange={handleFontChange}
        themeName={themeName}
        handleThemeChange={handleThemeChange}
        setIsInputFocused={setIsInputFocused}
      />

      <Divider sx={{ my: 2 }} />

      <AdvancedSettings
        setShowShortcutModal={setShowShortcutModal}
        handleOpenStrategyModal={handleOpenStrategyModal}
        handleResetStrategy={handleResetStrategy}
      />

      <Divider sx={{ my: 2 }} />

      <Button variant="contained" color="primary" onClick={handleSaveSettings} sx={{ width: "100%" }}>
        {t('saveAllSettings')}
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
