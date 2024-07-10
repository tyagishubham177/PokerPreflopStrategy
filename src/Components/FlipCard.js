import React from "react";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import FlipCardFront from "./FlipCardFront";
import FlipCardBack from "./FlipCardBack";

const FlipCard = ({ index, choice, flippedCards, toggleFlip }) => {
  return (
    <motion.div
      initial={{ scale: 0.85 }}
      whileHover={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "125px",
          p: 1,
          backgroundColor: "grey.100",
          borderRadius: "12px",
          position: "relative",
          transition: "all 0.6s ease",
          transformStyle: "preserve-3d",
          transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0)",
          cursor: "pointer",
        }}
        onClick={() => toggleFlip(index)}
      >
        <FlipCardFront flipped={flippedCards[index]} choice={choice} />
        <FlipCardBack flipped={flippedCards[index]} choice={choice} />
      </Paper>
    </motion.div>
  );
};

export default FlipCard;