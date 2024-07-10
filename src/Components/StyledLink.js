import React from "react";
import { Link, useTheme } from "@mui/material";

const StyledLink = () => {
  const theme = useTheme();

  return (
    <Link
      href="https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf"
      target="_blank"
      rel="noopener"
      underline="none"
      sx={{
        display: "block",
        color: theme.palette.common.white,
        fontSize: "1rem",
        fontWeight: "bold",
        mb: 3,
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
        padding: "10px 20px",
        borderRadius: "25px",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: theme.palette.secondary.dark,
          transform: "scale(1.05)",
        },
      }}
    >
      Click here to see charts
    </Link>
  );
};

export default StyledLink;
