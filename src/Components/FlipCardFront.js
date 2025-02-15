import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RotateRightIcon from '@mui/icons-material/RotateRight';

const FlipCardFront = ({ flipped, choice }) => {
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
      <Box>
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
          Hand: {choice.handNotation}
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: "0.75rem" }}>
            <strong>Situation:</strong> {choice.position.split(" - ")[0]}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, color: "error.main", textAlign: "left", fontSize: "0.75rem" }}
          >
            <strong>Villain:</strong> {choice.position.split(" - ")[2]}
          </Typography>
          <Typography variant="body1" sx={{ color: "success.main", textAlign: "left", fontSize: "0.75rem" }}>
            <strong>Hero:</strong> {choice.position.split(" - ")[1]}
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
