import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";

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
      <DialogContent sx={{ paddingTop: "16px" }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText primary="You'll be presented with a poker hand with a specific situation." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Based on the hand and situation, choose the best preflop action." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary="You have three lives. Incorrect decisions cost one life." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Your streak increases with correct answers, giving score bonuses." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="The game ends when you run out of lives or reach the maximum score." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="After the game ends you'll be shown the incorrect decisions made by you. So you can review and improve. Flip those cards to see more details." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="You can set customizable ranges and game difficulty in settings." />
          </ListItem>
        </List>
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
