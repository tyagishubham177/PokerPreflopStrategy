import React from 'react';
import { SwipeableDrawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsTab from "./SettingsTab";
import ErrorBoundary from "./ErrorBoundary";

const SettingsPanel = ({
  open,
  onClose,
  onOpen,
  difficulty,
  handleDifficultyChange,
  shortcutConfig,
  setShortcutConfig,
  isInputFocused,
  setIsInputFocused,
  // Strategy props
  currentStrategy,
  showStrategyModal,
  handleOpenStrategyModal,
  handleCloseStrategyModal,
  handleSaveStrategy,
  handleResetStrategy,
}) => {
  return (
    <SwipeableDrawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <ErrorBoundary fallbackMessage="There was an error in the settings panel. Please try closing and reopening it.">
          <SettingsTab 
            difficulty={difficulty} 
            handleDifficultyChange={handleDifficultyChange} 
            onPanelClose={onClose}
            shortcutConfig={shortcutConfig}
            setShortcutConfig={setShortcutConfig}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
            // Strategy props
            currentStrategy={currentStrategy}
            showStrategyModal={showStrategyModal}
            handleOpenStrategyModal={handleOpenStrategyModal}
            handleCloseStrategyModal={handleCloseStrategyModal}
            handleSaveStrategy={handleSaveStrategy}
            handleResetStrategy={handleResetStrategy}
          />
        </ErrorBoundary>
      </Box>
    </SwipeableDrawer>
  );
};

export default SettingsPanel;
