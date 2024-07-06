import React from 'react';
import { Button } from '@mui/material';

const DecisionButtons = ({ makeDecision }) => (
  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
    <Button variant="contained" color="primary" onClick={() => makeDecision('raise')}>
      Raise
    </Button>
    <Button variant="contained" color="secondary" onClick={() => makeDecision('call')}>
      Call
    </Button>
    <Button variant="contained" onClick={() => makeDecision('fold')}>
      Fold
    </Button>
  </div>
);

export default DecisionButtons;