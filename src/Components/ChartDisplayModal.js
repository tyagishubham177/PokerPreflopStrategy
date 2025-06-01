import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer';

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
  p: 4,
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
        <Typography id="chart-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
          {title || "Strategy Chart"} 
        </Typography>

        <Box sx={{ mb: 2, textAlign: 'center' }}>
          {handNotation && (
            <Typography variant="body1">
              Your Hand: {handNotation}
            </Typography>
          )}
          {yourChoice && (
            <Typography variant="body1">
              Your Decision: {yourChoice}
            </Typography>
          )}
          {decisionKey && (
            <Typography variant="body1">
              Correct Decision: {decisionKey}
            </Typography>
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

        <Box sx={{ mt: 2, mb: 2, p: 1, border: '1px solid grey', borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, width: 'fit-content', alignSelf: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 20, height: 20, mr: 1, border: '1px solid black', backgroundColor: 'lightblue' }} />
            <Typography variant="body2">Optimal Play Range for this Action</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 20, height: 20, mr: 1, border: '1px solid black', backgroundColor: 'rgba(255, 0, 0, 0.3)' }} />
            <Typography variant="body2">Your Play Range (if different from optimal)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 20, height: 20, mr: 1, border: '2px solid #FFD700', backgroundColor: 'transparent' }} />
            <Typography variant="body2">Specific Hand in Question</Typography>
          </Box>
        </Box>
        
        <Button onClick={onClose} sx={{ mt: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
