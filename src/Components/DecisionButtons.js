import React from "react";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";

const DecisionButtons = ({ availableActions, makeDecision }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonStyle = {
    width: isMobile ? "100%" : "auto",
    minWidth: isMobile ? "auto" : "100px",
    fontSize: isMobile ? "0.875rem" : "1rem",
    padding: theme.spacing(1),
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[4],
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: theme.spacing(1),
        justifyContent: "center",
        margin: theme.spacing(1, 0),
      }}
    >
      {availableActions.map((action) => (
        <Button
          key={action}
          variant="contained"
          color={action === "Fold" ? "secondary" : "primary"}
          onClick={() => makeDecision(action)}
          sx={buttonStyle}
        >
          {action}
        </Button>
      ))}
    </Box>
  );
};

export default DecisionButtons;
