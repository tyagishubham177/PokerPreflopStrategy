import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import InfoIcon from '@mui/icons-material/Info'; // Added import

const FlipCardFront = ({ flipped, choice = {}, onInfoClick }) => { // Added onInfoClick prop
  const positionParts = typeof choice.position === 'string' ? choice.position.split(" - ") : [];
  const situation = positionParts[0] || '';
  const heroPosition = positionParts[1] || '';
  const villainPosition = positionParts[2] || '';

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
        justifyContent: "space-between",
        p: 1,
        opacity: flipped ? 0 : 1,
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
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
          top: 8,
          right: 8,
          zIndex: 2,
          color: 'black',
          backgroundColor: 'transparent',
        }}
      >
        <InfoIcon />
      </IconButton>

      <Box> {/* Existing content box */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textAlign: "left",
            color: "primary.main",
            fontSize: "0.875rem",
          }}
        >
          Hand: {choice?.handNotation}
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: "0.75rem" }}>
            <strong>Situation:</strong> {situation}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, color: "error.main", textAlign: "left", fontSize: "0.75rem" }}
          >
            <strong>Villain:</strong> {villainPosition}
          </Typography>
          <Typography variant="body1" sx={{ color: "success.main", textAlign: "left", fontSize: "0.75rem" }}>
            <strong>Hero:</strong> {heroPosition}
          </Typography>
        </Box>
      </Box>
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

export default FlipCardFront;
