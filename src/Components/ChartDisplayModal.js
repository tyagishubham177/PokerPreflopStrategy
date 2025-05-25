import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 480,
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
        
        <Button onClick={onClose} sx={{ mt: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
