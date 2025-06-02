import React from 'react';
import { Modal, Box, Typography, Button, Chip, Paper } from '@mui/material'; // Added Paper
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer';
import StyleIcon from '@mui/icons-material/Style';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95vw', sm: '80vw', md: 750, lg: 850 }, // Increased width
  maxHeight: '90vh',
  overflowY: 'auto', // Keep this for overall modal scroll if needed
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2, // Retain overall padding, or adjust if needed e.g. p:1 if columns have their own
  // display: 'flex', // Removed: Handled by inner wrapper
  // flexDirection: 'column', // Removed
  // alignItems: 'center', // Removed
};

const ChartDisplayModal = ({ open, onClose, title, situationKey, positionKey, decisionKey, handNotation = null, yourChoice, highlightFoldCell, positionString = '' }) => {
  const positionParts = typeof positionString === 'string' ? positionString.split(" - ") : [];
  const situation = positionParts[0] || 'N/A';
  const heroPosition = positionParts[1] || 'N/A';
  const villainPosition = positionParts[2] || 'N/A';

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', height: '100%', gap: { xs: 2, sm: 2 } }}> {/* Added gap */}
          {/* Left Column for Chart */}
          <Box sx={{ flex: { xs: '1 1 auto', sm: '0 0 auto' }, p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {situationKey && positionKey && decisionKey ? (
              <ReadOnlyStrategyChartViewer
                situationKey={situationKey}
                positionKey={positionKey}
                decisionKey={decisionKey}
                incorrectActionName={yourChoice}
                handToHighlight={handNotation}
              />
            ) : (
              <Typography sx={{ mt: 2, textAlign: 'center' }}>
                Chart information is unavailable for this selection.
              </Typography>
            )}
          </Box>

          {/* Right Column for Details, Legend, Button */}
          <Box sx={{ flex: { xs: '1 1 auto', sm: 1 }, p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflowY: 'auto', overflowX: 'hidden', gap: 2 }}> {/* Adjusted alignItems and added gap */}
            <Typography id="chart-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
              {title || "Strategy Chart"}
            </Typography>

            {/* Game Context Section */}
            <Paper elevation={1} sx={{ p: 2, width: '100%'}}>
              <Typography variant="subtitle1" gutterBottom>Game Context</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <InfoOutlinedIcon sx={{ mr: 1, color: 'action.active' }} />
                <Typography variant="body2"><strong>Situation:</strong> {situation}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="body2"><strong>Hero:</strong> <Box component="span" sx={{ color: 'success.main' }}>{heroPosition.replace('Hero: ', '')}</Box></Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}> {/* Removed mb:1 for last item for now, can add if needed */}
                <SportsKabaddiIcon sx={{ mr: 1, color: 'error.main' }} />
                <Typography variant="body2"><strong>Villain:</strong> <Box component="span" sx={{ color: 'error.main' }}>{villainPosition.replace('Villain: ', '')}</Box></Typography>
              </Box>
            </Paper>

            {/* Play Analysis Section */}
            <Paper elevation={1} sx={{ p: 2, width: '100%'}}>
              <Typography variant="subtitle1" gutterBottom>Play Analysis</Typography>
              {handNotation && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <StyleIcon sx={{ mr: 1, fontSize: '1.1rem' }} /> {/* Adjusted Icon margin */}
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    Your Hand: {handNotation}
                  </Typography>
                </Box>
              )}
              {yourChoice && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <HighlightOffIcon sx={{ mr: 1, fontSize: '1.1rem', color: 'error.main' }} /> {/* Adjusted Icon margin */}
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    Your Decision: {yourChoice}
                  </Typography>
                </Box>
              )}
              {decisionKey && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Removed mb:0.5 for last item */}
                  <CheckCircleOutlineIcon sx={{ mr: 1, fontSize: '1.1rem', color: 'success.main' }} /> {/* Adjusted Icon margin */}
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    Correct Decision: {decisionKey}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Chart Legend Section */}
            <Paper elevation={1} sx={{ p: 2, width: '100%'}}>
              <Typography variant="subtitle1" gutterBottom>Chart Legend</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}> {/* Ensured this Box is present for Chip layout */}
                <Chip
                  icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'lightblue', border: '1px solid grey' }} />}
                  label="Optimal Play Range for this Action"
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'rgba(255, 0, 0, 0.3)', border: '1px solid grey' }} />}
                label="Your Play Range (if different from optimal)"
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<Box sx={{ width: 12, height: 12, borderRadius: '2px', border: '2px solid #FFD700', backgroundColor: 'transparent' }} />}
                label="Specific Hand in Question"
                size="small"
                variant="outlined"
              />
            </Box>

              </Box>
            </Paper>

            <Button onClick={onClose} sx={{ mt: 'auto', pt:1, width: '100%' }}> {/* Adjusted pt and ensured mt:auto */}
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
