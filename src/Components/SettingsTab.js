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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StrategyCustomizationModal from './StrategyCustomizationModal.js';
import ShortcutConfigModal from './ShortcutConfigModal'; // Import the new modal
// import { initialPokerStrategy } from '../Constants/InitialStrategy.js'; // No longer needed here
// import { CUSTOM_STRATEGY_LS_KEY } from '../Constants/InitialStrategy.js'; // No longer needed here
// import { POSITION_LABELS } from '../Constants/GameLabels.js'; // Not used in this file anymore
// import { DIFFICULTY_LEVELS } from '../Constants/GameConstants'; // Not used in this file anymore


// const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy'; // Managed by PokerGame.js
const SOUND_SETTINGS_LS_KEY = 'soundSettings'; // This will be managed by parent now

// Remove ShortcutConfigModal import
// import ShortcutConfigModal from './ShortcutConfigModal';

const SettingsTab = ({
  username,
  soundEnabled,
  soundVolume,
  difficulty,
  shortcutConfig,
  setShortcutConfig,
  handleDifficultyChange,
  handleSoundToggle,
  handleVolumeChange,
  handleUsernameChange,
  handleSaveSettings,
  setIsInputFocused,
  // Strategy props from PokerGame.js
  currentStrategy,
  showStrategyModal,
  handleOpenStrategyModal,
  handleCloseStrategyModal,
  handleSaveStrategy,
  handleResetStrategy,
  // onPanelClose, // This prop seems to be used inside handleSaveSettings, which is now a prop. Let parent handle this.
}) => {
  // Local state for legacy shortcut modal visibility - REMOVED
  // const [showShortcutModal, setShowShortcutModal] = useState(false);

  // Helper function for shortcut key changes
  const handleShortcutKeyChange = (actionName, newKey) => {
    const processedKey = newKey.charAt(0).toLowerCase();
    setShortcutConfig(prevConfig => ({
      ...prevConfig,
      [actionName]: processedKey,
    }));
  };

  // All strategy related state and handlers (currentStrategy, showStrategyModal,
  // handleOpenStrategyModal, handleCloseStrategyModal, handleSaveStrategy, handleResetStrategy)
  // are now received as props from PokerGame.js via SettingsPanel.js.
  // Local useState for showStrategyModal and currentStrategy, and associated handlers have been removed.

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", textAlign: 'center', mb: 2 }}>
        Game Settings
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}> {/* Scrollable area for accordions */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>General</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Appearance/Sound</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={<Switch checked={soundEnabled} onChange={handleSoundToggle} color="primary" />}
              label="Sound Effects"
              sx={{ my: 1, display: 'flex' }} // Adjusted margin and display
            />
            <Typography id="sound-volume-slider" gutterBottom sx={{ color: "text.secondary", mt: 2 }}>
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
              sx={{ mt: 0, mb: 1 }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Gameplay</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Select
              fullWidth
              // label="Difficulty" // Label is part of FormControl or can be standalone Typography
              value={difficulty}
              onChange={(event) => handleDifficultyChange(event.target.value)}
              // margin="dense" // Not applicable for Select like this, use sx for spacing
              sx={{ mb: 2, mt:1 }}
              displayEmpty
              inputProps={{ 'aria-label': 'Difficulty' }}
            >
              <MenuItem value="" disabled><em>Select Difficulty</em></MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Keyboard Shortcuts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Hint Key"
              value={shortcutConfig?.hintKey || ''}
              onChange={(e) => handleShortcutKeyChange('hintKey', e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              inputProps={{ maxLength: 1 }}
              margin="dense"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Pause/Play Key"
              value={shortcutConfig?.pausePlayKey || ''}
              onChange={(e) => handleShortcutKeyChange('pausePlayKey', e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              inputProps={{ maxLength: 1 }}
              margin="dense"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Settings Key"
              value={shortcutConfig?.settingsKey || ''}
              onChange={(e) => handleShortcutKeyChange('settingsKey', e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              inputProps={{ maxLength: 1 }}
              margin="dense"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Rules Key"
              value={shortcutConfig?.rulesKey || ''}
              onChange={(e) => handleShortcutKeyChange('rulesKey', e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              inputProps={{ maxLength: 1 }}
              margin="dense"
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
              Changes are saved automatically when you modify a shortcut.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Strategy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenStrategyModal} // Now uses prop
              sx={{ mb: 1, width: "100%" }}
            >
              Customize Preflop Strategy
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleResetStrategy} // Now uses prop
              sx={{ mb: 2, width: "100%" }}
            >
              Reset to Default Strategy
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Button to open ShortcutConfigModal - REMOVED */}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSettings}
        sx={{ mt: 'auto', width: "100%", flexShrink: 0 }} // Pushes to bottom if content above is short
      >
        Save All Settings
      </Button>

      <StrategyCustomizationModal
        open={showStrategyModal} // Prop
        onClose={handleCloseStrategyModal} // Prop
        initialStrategy={currentStrategy} // Prop
        onSave={handleSaveStrategy} // Prop
      />

      {/* ShortcutConfigModal instance - REMOVED */}
    </Box>
  );
};

export default SettingsTab;
