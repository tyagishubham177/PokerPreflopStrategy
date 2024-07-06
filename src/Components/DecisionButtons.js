import React from "react";
import { Button, Box } from "@mui/material";

const DecisionButtons = ({ availableActions, makeDecision }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
    {availableActions.map((action) => (
      <Button
        key={action}
        variant="contained"
        color={action === "Fold" ? "secondary" : "primary"}
        onClick={() => makeDecision(action)}
        sx={{ flexGrow: 1, minWidth: "100px" }}
      >
        {action}
      </Button>
    ))}
  </Box>
);

export default DecisionButtons;
