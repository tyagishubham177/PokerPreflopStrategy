import React from 'react';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
  Stack, // Added Stack for layout
} from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp'; // Added VolumeUp icon
import VolumeMute from '@mui/icons-material/VolumeMute'; // Added VolumeMute icon

const SoundSettings = ({
  soundEnabled,
  handleSoundToggle,
  soundVolume,
  handleVolumeChange,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Sound Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={soundEnabled} onChange={handleSoundToggle} color="primary" />}
        label="Sound Effects"
        sx={{ mb: 2 }} // Adjusted margin for spacing with the Stack below
      />
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        {soundEnabled && soundVolume > 0 ? <VolumeUp /> : <VolumeMute />}
        <Slider
          value={soundEnabled ? soundVolume : 0} // Show 0 if sound is disabled
          onChange={handleVolumeChange}
          aria-labelledby="sound-volume-slider-label" // Retained for accessibility, can be linked to a hidden label or the icon itself if needed
          min={0}
          max={1}
          step={0.01}
          disabled={!soundEnabled}
          sx={{ flexGrow: 1 }}
        />
      </Stack>
    </Paper>
  );
};

export default SoundSettings;
