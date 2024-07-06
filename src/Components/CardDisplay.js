import React from 'react';
import { Typography } from '@mui/material';

const CardDisplay = ({ hand }) => (
  <Typography variant="h4" align="center" style={{ marginBottom: 16 }}>
    {hand.join(' ')}
  </Typography>
);

export default CardDisplay;
