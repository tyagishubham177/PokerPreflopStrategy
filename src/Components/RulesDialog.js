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
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>Game Rules</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          1. You'll be presented with a poker hand and a specific situation.
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
        <Typography variant="body1">
          For more detailed poker strategies, check out this{" "}
          <Link href="https://www.pokerstrategy.com" target="_blank" rel="noopener noreferrer">
            dummy link
          </Link>
          .
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