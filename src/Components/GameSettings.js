import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormLabel, // Added FormLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GameSettings = ({
  username,
  handleUsernameChange,
  difficulty,
  handleDifficultyChange,
  language,
  handleLanguageChange,
  setIsInputFocused,
}) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ mb: 2, overflow: 'hidden' }}> {/* Removed p: 2 */}
      <Accordion defaultExpanded={true} elevation={0} sx={{
        '&.MuiAccordion-root:before': { display: 'none' },
        width: '100%'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="game-settings-content"
          id="game-settings-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}> {/* Kept h6 */}
            {t('gameSettings')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> {/* Added padding back & flex column for spacing */}
          <TextField
            fullWidth
            label={t('username')}
            value={username}
            onChange={handleUsernameChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            margin="normal"
            variant="outlined"
          />
          <FormLabel sx={{ mb: 0.5, display: 'block', color: 'text.secondary', fontWeight: 'normal', mt: 2 }}> {/* Added mt:2 for spacing from TextField */}
            {t('gameDifficulty')}
          </FormLabel>
          <Select
            fullWidth
            // label="Difficulty" // Removed label as FormLabel is used
            value={difficulty}
            onChange={(event) => handleDifficultyChange(event.target.value)}
            // margin="normal" // Removed margin
            sx={{ mt: 0.5 }} // Adjusted to mt: 0.5 as per refined thought, mb from FormLabel is 0.5
          >
            <MenuItem value="Easy">{t('easy')}</MenuItem>
            <MenuItem value="Medium">{t('medium')}</MenuItem>
            <MenuItem value="Hard">{t('hard')}</MenuItem>
          </Select>

          <FormLabel sx={{ mb: 0.5, display: 'block', color: 'text.secondary', fontWeight: 'normal', mt: 2 }}>
            {t('language')}
          </FormLabel>
          <Select
            fullWidth
            value={language}
            onChange={(event) => handleLanguageChange(event.target.value)}
            sx={{ mt: 0.5 }}
          >
            <MenuItem value="en">{t('english')}</MenuItem>
            <MenuItem value="hi">{t('hindi')}</MenuItem>
          </Select>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default GameSettings;
