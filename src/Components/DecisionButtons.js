import React from "react";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";

const DecisionButtons = ({ availableActions, makeDecision }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonStyle = {
    flexGrow: 1,
    minWidth: isMobile ? "100%" : "120px",
    fontSize: isMobile ? "0.875rem" : "1rem",
    padding: isMobile ? theme.spacing(1) : theme.spacing(1.5),
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
        flexWrap: "wrap",
        gap: theme.spacing(1.5),
        justifyContent: "center",
        margin: theme.spacing(2, 0),
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
