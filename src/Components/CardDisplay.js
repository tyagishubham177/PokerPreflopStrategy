import React from "react";
import { Typography, Box } from "@mui/material";

const CardDisplay = ({ hand }) => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}>
    {hand.map((card, index) => (
      <Typography
        key={index}
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: ["♥", "♦"].includes(card[1]) ? "red" : "black",
          border: "2px solid",
          borderRadius: "10px",
          padding: "10px",
          minWidth: "60px",
          textAlign: "center",
        }}
      >
        {card}
      </Typography>
    ))}
  </Box>
);

export default CardDisplay;
