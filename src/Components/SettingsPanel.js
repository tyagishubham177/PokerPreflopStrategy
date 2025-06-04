import React from 'react';
import { useTranslation } from 'react-i18next';
import { SwipeableDrawer, Box, Typography, IconButton, Stack } from "@mui/material"; // Added Stack
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from '@mui/icons-material/Settings'; // Added SettingsIcon
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
  setIsInputFocused
}) => {
  const { t } = useTranslation();
  return (
    <SwipeableDrawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Stack direction="row" alignItems="center">
            <SettingsIcon sx={{ mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {t('settings')}
            </Typography>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <ErrorBoundary fallbackMessage={t('errorSettingsPanel')}>
          <SettingsTab 
            difficulty={difficulty} 
            handleDifficultyChange={handleDifficultyChange} 
            onPanelClose={onClose}
            shortcutConfig={shortcutConfig}
            setShortcutConfig={setShortcutConfig}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
          />
        </ErrorBoundary>
      </Box>
    </SwipeableDrawer>
  );
};

export default SettingsPanel;
