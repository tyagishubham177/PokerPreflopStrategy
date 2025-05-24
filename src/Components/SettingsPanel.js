import React from 'react';
// Removed FormControl, InputLabel, Select, MenuItem from this import as they are no longer used directly here
import { SwipeableDrawer, Box, Typography, IconButton } from "@mui/material"; 
import CloseIcon from "@mui/icons-material/Close";
import SettingsTab from "./SettingsTab";
import ErrorBoundary from "./ErrorBoundary"; 
// DIFFICULTY_LEVELS import is no longer needed here
// import { DIFFICULTY_LEVELS } from "../Constants/GameConstants";

const SettingsPanel = ({ open, onClose, onOpen, difficulty, handleDifficultyChange }) => {
  return (
    <SwipeableDrawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Difficulty FormControl removed from here */}

        <ErrorBoundary fallbackMessage="There was an error in the settings panel. Please try closing and reopening it.">
          {/* Pass difficulty, handleDifficultyChange, and onClose (as onPanelClose) to SettingsTab */}
          <SettingsTab 
            difficulty={difficulty} 
            handleDifficultyChange={handleDifficultyChange} 
            onPanelClose={onClose} 
          />
        </ErrorBoundary>
      </Box>
    </SwipeableDrawer>
  );
};

export default SettingsPanel;
