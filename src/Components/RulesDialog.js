import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const RulesDialog = ({ showRules, setShowRules }) => (
  <Dialog open={showRules} onClose={() => setShowRules(false)}>
    <DialogTitle>Rules</DialogTitle>
    <DialogContent>
      {/* Add your rules content here */}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setShowRules(false)}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default RulesDialog;