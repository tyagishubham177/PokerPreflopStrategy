import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link } from "@mui/material";

const RulesDialog = ({ showRules, setShowRules }) => {
  return (
    <Dialog
      open={showRules}
      onClose={() => setShowRules(false)}
      maxWidth="sm"
      fullWidth
      TransitionProps={{
        enter: "transition-transform duration-300",
        exit: "transition-transform duration-300",
      }}
    >
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>Game Rules & Info</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          1. You'll be presented with a poker hand with a specific situation.
        </Typography>
        <Typography variant="body1" paragraph>
          2. Based on the hand and situation, choose the best preflop action.
        </Typography>
        <Typography variant="body1" paragraph>
          3. You have three lives. Incorrect decisions cost one life.
        </Typography>
        <Typography variant="body1" paragraph>
          4. Your streak increases with correct answers, giving score bonuses.
        </Typography>
        <Typography variant="body1" paragraph>
          5. The game ends when you run out of lives or reach the maximum score.
        </Typography>
        <Typography variant="body1" paragraph>
          6. After the game ends you'll be shown the incorrect decisions made by you. So you can review and improve. 
          Flip those cards to see more details.
        </Typography>
        <Typography variant="body1" paragraph>
          7. You can set customizable ranges and game difficulty in settings.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowRules(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RulesDialog;
