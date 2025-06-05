import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { COLORS } from "../Constants/Colors";
import { motion } from "framer-motion";

const CustomCard = ({ card }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rank, suit] = card.split("");
  const isRed = ["♥", "♦"].includes(suit);
  const displayRank = rank === "T" ? "10" : rank;
  const numericRank = parseInt(displayRank, 10);
  const isNumeric = !isNaN(numericRank);

  return (
    <Box
      sx={{
        width: isMobile ? "60px" : "90px",
        height: isMobile ? "84px" : "126px",
        backgroundColor: COLORS.white,
        borderRadius: "8px",
        border: `2px solid ${theme.palette.grey[300]}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4px",
        boxShadow: theme.shadows[3],
        color: isRed ? theme.palette.error.main : theme.palette.text.primary,
        position: "relative",
      }}
    >
      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={{ position: "absolute", top: 2, left: 2 }}
      >
        {displayRank}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "2px",
          width: "80%",
          height: "70%",
        }}
      >
        {isNumeric
          ? Array.from({ length: numericRank }).map((_, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: isMobile
                    ? `${Math.max(8, 14 - numericRank)}px`
                    : `${Math.max(12, 22 - numericRank)}px`,
                  lineHeight: 1,
                }}
              >
                {suit}
              </Typography>
            ))
          : (
              <Typography variant={isMobile ? "h5" : "h4"}>{suit}</Typography>
            )}
      </Box>
      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={{
          position: "absolute",
          bottom: 2,
          right: 2,
          transform: "rotate(180deg)",
        }}
      >
        {displayRank}
      </Typography>
    </Box>
  );
};

const CardDisplay = ({ hand = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        my: 1,
        perspective: "1000px",
      }}
    >
      {hand.map((card, index) => (
        <motion.div
          key={card}
          initial={{ opacity: 0, rotateY: 180, y: -30 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          exit={{ opacity: 0, rotateY: 180, y: 30 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <CustomCard card={card} />
        </motion.div>
      ))}
    </Box>
  );
};

export default CardDisplay;
