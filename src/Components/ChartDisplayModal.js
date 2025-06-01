import React from 'react';
import { Modal, Box, Typography, Button, Chip } from '@mui/material'; // Added Chip
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer';
import StyleIcon from '@mui/icons-material/Style'; // Added StyleIcon
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Added CheckCircleOutlineIcon
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Added HighlightOffIcon

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: 500, md: 600 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2, // Reduced padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const ChartDisplayModal = ({ open, onClose, title, situationKey, positionKey, decisionKey, handNotation = null, yourChoice, highlightFoldCell }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
    >
      <Box sx={style}>
        <Typography id="chart-modal-title" variant="h6" component="h2" sx={{ mb: 1, textAlign: 'center' }}> {/* Reduced margin */}
          {title || "Strategy Chart"} 
        </Typography>

        <Box sx={{ mb: 1, textAlign: 'center' }}> {/* Reduced margin */}
          {handNotation && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
              <StyleIcon sx={{ mr: 0.5, fontSize: '1.1rem' }} />
              <Typography variant="body2"> {/* Changed variant for smaller font */}
                Your Hand: {handNotation}
              </Typography>
            </Box>
          )}
          {yourChoice && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
              <HighlightOffIcon sx={{ mr: 0.5, fontSize: '1.1rem', color: 'error.main' }} />
              <Typography variant="body2"> {/* Changed variant for smaller font */}
                Your Decision: {yourChoice}
              </Typography>
            </Box>
          )}
          {decisionKey && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircleOutlineIcon sx={{ mr: 0.5, fontSize: '1.1rem', color: 'success.main' }} />
              <Typography variant="body2"> {/* Changed variant for smaller font */}
                Correct Decision: {decisionKey}
              </Typography>
            </Box>
          )}
        </Box>
        
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

        <Box sx={{ mt: 1.5, mb: 1.5, p: 1, border: '1px solid grey', borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: 'fit-content', alignSelf: 'center' }}> {/* Increased padding slightly for chips, increased gap */}
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
        
        <Button onClick={onClose} sx={{ mt: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}> {/* Reduced margin */}
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
