import React from 'react';
import { SwipeableDrawer, Box, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsTab from "./SettingsTab";
import ErrorBoundary from "./ErrorBoundary"; 
import { DIFFICULTY_LEVELS } from "../Constants/GameConstants";

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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-select-label"
            id="difficulty-select"
            value={difficulty}
            label="Difficulty"
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            {Object.keys(DIFFICULTY_LEVELS).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ErrorBoundary fallbackMessage="There was an error in the settings panel. Please try closing and reopening it.">
          <SettingsTab />
        </ErrorBoundary>
      </Box>
    </SwipeableDrawer>
  );
};

export default SettingsPanel;
