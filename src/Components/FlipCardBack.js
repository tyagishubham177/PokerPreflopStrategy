import React from "react";
import { Box, Typography } from "@mui/material";

const FlipCardBack = ({ flipped, choice }) => {
  return (
    <Box
      sx={{
        backfaceVisibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        transform: "rotateY(180deg)",
        backgroundColor: "grey.200",
        borderRadius: "12px",
        opacity: flipped ? 1 : 0,
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <Typography
        variant="body1"
        color="error.main"
        sx={{ fontStyle: "italic", textAlign: "center", mb: 2, fontSize: "0.875rem" }}
      >
        Your choice: {choice.yourChoice}
      </Typography>
      <Typography
        variant="body1"
        color="success.main"
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "0.875rem" }}
      >
        Correct choice: {choice.correctDecision}
      </Typography>
    </Box>
  );
};

export default FlipCardBack;
