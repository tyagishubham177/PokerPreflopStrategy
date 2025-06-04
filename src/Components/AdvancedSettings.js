import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedSettings = ({
  setShowShortcutModal,
  handleOpenStrategyModal,
  handleResetStrategy,
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
          aria-controls="advanced-settings-content"
          id="advanced-settings-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {t('advancedSettings')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> {/* Added padding back & flex column */}
          <Button
            variant="outlined"
            color="info"
            onClick={() => setShowShortcutModal(true)}
            fullWidth
            sx={{ mb: 1 }}
          >
            {t('configureKeyboardShortcuts')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenStrategyModal}
            fullWidth
            sx={{ mb: 1 }}
          >
            {t('customizePreflopStrategy')}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleResetStrategy}
            fullWidth
          >
            {t('resetToDefaultStrategy')}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default AdvancedSettings;
