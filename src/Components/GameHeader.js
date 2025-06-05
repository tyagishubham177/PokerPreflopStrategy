import React from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { COLORS } from "../Constants/Colors";
import InfoIcon from "@mui/icons-material/Info";
import pokerImage from "../Assets/pokerlogo512.png";
import { useTranslation } from "react-i18next";

const GameHeader = ({ onInfoClick, onLongPressStart, onLongPressEnd }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        backgroundColor: "primary.main",
      }}
    >
      <Avatar src={pokerImage} sx={{ width: 40, height: 40 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: COLORS.white }}>
        {t("learnPreflopStrategy")}
      </Typography>
      <IconButton
        aria-label="info"
        onClick={onInfoClick}
        onMouseDown={onLongPressStart}
        onMouseUp={onLongPressEnd}
        onTouchStart={onLongPressStart}
        onTouchEnd={onLongPressEnd}
        sx={{ color: COLORS.white }}
      >
        <InfoIcon />
      </IconButton>
    </Box>
  );
};

export default GameHeader;
