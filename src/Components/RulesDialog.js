import React from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>{t('gameRulesTitle')}</DialogTitle>
      <DialogContent sx={{ paddingTop: "16px" }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules1')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules2')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules3')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules4')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules5')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules6')} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('gameRules7')} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowRules(false)} color="primary">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RulesDialog;
