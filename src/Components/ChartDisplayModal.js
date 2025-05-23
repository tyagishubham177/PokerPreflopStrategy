import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material'; // Keep Button for Close
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer'; // Import new component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 480, // Adjusted width
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center content including the chart
};

// Props will change: open, onClose, title, situationKey, positionKey, decisionKey
const ChartDisplayModal = ({ open, onClose, title, situationKey, positionKey, decisionKey }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
    >
      <Box sx={style}>
        <Typography id="chart-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
          {/* The title for ReadOnlyStrategyChartViewer is internal to it. This is modal's title. */}
          {title || "Strategy Chart"} 
        </Typography>
        
        {/* Render the chart viewer if keys are provided */}
        {situationKey && positionKey && decisionKey ? (
          <ReadOnlyStrategyChartViewer
            situationKey={situationKey}
            positionKey={positionKey}
            decisionKey={decisionKey}
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
