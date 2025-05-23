import React from 'react';
import { Modal, Box, Typography, Button, Link } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChartDisplayModal = ({ open, onClose, title, chartLink, situation, position }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
      aria-describedby="chart-modal-description"
    >
      <Box sx={style}>
        <Typography id="chart-modal-title" variant="h6" component="h2">
          {title || "Poker Chart Information"}
        </Typography>
        <Typography id="chart-modal-description" sx={{ mt: 2 }}>
          Please refer to the Poker Chart PDF for the specific chart related to:
          <br />
          <strong>Situation:</strong> {situation}
          <br />
          <strong>Position:</strong> {position}
        </Typography>
        {chartLink && (
          <Link href={chartLink} target="_blank" rel="noopener noreferrer" sx={{ mt: 2, display: 'block' }}>
            Open Poker Charts PDF
          </Link>
        )}
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
