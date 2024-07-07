import React from "react";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";

const DecisionButtons = ({ availableActions, makeDecision }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Adjust styles based on the number of actions and screen size
  const buttonStyle = {
    flexGrow: 1,
    minWidth: isMobile ? "100%" : "100px", // Ensuring full width on mobile only
    fontSize: isMobile ? "0.75rem" : "1rem",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Conditionally setting the flex direction
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
        margin: isMobile ? 2 : 1,
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
