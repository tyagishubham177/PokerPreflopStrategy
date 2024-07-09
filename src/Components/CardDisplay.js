import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const CustomCard = ({ card }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rank, suit] = card.split("");
  const isRed = ["♥", "♦"].includes(suit);

  return (
    <Box
      sx={{
        width: isMobile ? "60px" : "100px",
        height: isMobile ? "84px" : "140px",
        backgroundColor: "white",
        borderRadius: "10px",
        border: `2px solid ${theme.palette.grey[300]}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px",
        boxShadow: theme.shadows[3],
        color: isRed ? theme.palette.error.main : theme.palette.text.primary,
        position: "relative",
      }}
    >
      <Typography variant={isMobile ? "body2" : "h6"} sx={{ position: "absolute", top: 5, left: 5 }}>
        {rank}
      </Typography>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {suit}
      </Typography>
      <Typography
        variant={isMobile ? "body2" : "h6"}
        sx={{ position: "absolute", bottom: 5, right: 5, transform: "rotate(180deg)" }}
      >
        {rank}
      </Typography>
    </Box>
  );
};

const CardDisplay = ({ hand }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: isMobile ? 1 : 2,
        my: 2,
        perspective: "1000px",
      }}
    >
      {hand.map((card, index) => (
        <motion.div
          key={card}
          initial={{ opacity: 0, rotateY: 180, y: -50 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <CustomCard card={card} />
        </motion.div>
      ))}
    </Box>
  );
};

export default CardDisplay;
