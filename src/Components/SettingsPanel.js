import React from 'react';
import { SwipeableDrawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsTab from "./SettingsTab";
import ErrorBoundary from "./ErrorBoundary"; 

const SettingsPanel = ({ open, onClose, onOpen }) => {
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
          <SettingsTab />
        </ErrorBoundary>
      </Box>
    </SwipeableDrawer>
  );
};

export default SettingsPanel;
