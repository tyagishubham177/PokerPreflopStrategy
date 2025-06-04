import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeMute from '@mui/icons-material/VolumeMute';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SoundSettings = ({
  soundEnabled,
  handleSoundToggle,
  soundVolume,
  handleVolumeChange,
}) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ mb: 2, overflow: 'hidden' }}> {/* Removed p: 2, added overflow: hidden for better Accordion fit if needed */}
      <Accordion defaultExpanded={true} elevation={0} sx={{
        '&.MuiAccordion-root:before': { display: 'none' }, // Remove top border line
        width: '100%'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="sound-settings-content"
          id="sound-settings-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}> {/* Kept h6 for now, can adjust if too large */}
            {t('soundSettings')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}> {/* Added padding back here */}
          <FormControlLabel
            control={<Switch checked={soundEnabled} onChange={handleSoundToggle} color="primary" />}
            label={t('soundEffects')}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            {soundEnabled && soundVolume > 0 ? <VolumeUp /> : <VolumeMute />}
            <Slider
              value={soundEnabled ? soundVolume : 0}
              onChange={handleVolumeChange}
              aria-labelledby="sound-volume-slider-label"
              min={0}
              max={1}
              step={0.01}
              disabled={!soundEnabled}
              sx={{ flexGrow: 1 }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default SoundSettings;
