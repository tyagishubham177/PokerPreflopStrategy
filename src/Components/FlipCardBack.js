import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import InfoIcon from '@mui/icons-material/Info'; // Import InfoIcon

// Accept onInfoClick and choice (choice is already accepted)
const FlipCardBack = ({ flipped, choice = {}, onInfoClick }) => {
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
        justifyContent: "center", // Main content centered
        alignItems: "center",
        p: 1,
        transform: "rotateY(180deg)",
        backgroundColor: "grey.200",
        borderRadius: "12px",
        opacity: flipped ? 1 : 0,
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* InfoIconButton added here */}
      <IconButton
        aria-label="info"
        onClick={(e) => {
            e.stopPropagation(); // Prevent card flip
            if (onInfoClick) {
              onInfoClick(choice);
            }
        }}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          zIndex: 2,
          color: 'black',
          backgroundColor: 'transparent',
        }}
      >
        <InfoIcon />
      </IconButton>

      {/* Existing content */}
      <Typography
        variant="body1"
        color="error.main"
        sx={{ fontStyle: "italic", textAlign: "center", mb: 2, fontSize: "0.875rem" }}
      >
        Your choice: {choice?.yourChoice}
      </Typography>
      <Typography
        variant="body1"
        color="success.main"
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "0.875rem" }}
      >
        Correct choice: {choice?.correctDecision}
      </Typography>

      {/* Existing RotateRightIcon */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "transparent",
          color: "black",
        }}
      >
        <RotateRightIcon />
      </IconButton>
    </Box>
  );
};

export default FlipCardBack;
