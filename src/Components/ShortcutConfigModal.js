import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material';

const ShortcutConfigModal = ({ open, onClose, shortcutConfig, setShortcutConfig }) => {
  const { t } = useTranslation();
  const handleShortcutKeyChange = (actionName, newKey) => {
    const processedKey = newKey.charAt(0).toLowerCase();
    // Prevent assigning an empty key if desired, or handle upstream.
    // For now, allows empty to clear, which might be okay.
    setShortcutConfig(prevConfig => ({
      ...prevConfig,
      [actionName]: processedKey,
    }));
  };

  // Helper to render TextFields to avoid repetition
  const renderTextField = (label, actionName) => (
    <TextField
      fullWidth
      label={label}
      value={shortcutConfig?.[actionName] || ''}
      onChange={(e) => handleShortcutKeyChange(actionName, e.target.value)}
      variant="outlined"
      margin="dense"
      sx={{ mb: 2 }}
      inputProps={{ maxLength: 1 }}
      // Ensure it has a unique key if mapped, but here they are distinct calls
    />
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Configure Keyboard Shortcuts</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}> {/* Add some padding top for content */}
          {renderTextField("Hint Key", "hint")}
          {renderTextField("Pause/Play Key", "pause")}
          {renderTextField("Settings Key", "settings")}
          {renderTextField("Rules Key", "rules")}
          <Typography variant="caption" color="textSecondary">
            Changes are saved automatically. Press Esc or click away to close.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('done')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShortcutConfigModal;
