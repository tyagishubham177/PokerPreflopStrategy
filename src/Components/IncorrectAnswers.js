import React from "react";
import { Box, Typography, List, ListItem, Paper, useTheme, useMediaQuery, Link } from "@mui/material";

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2, backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
        Incorrect Answers:
      </Typography>
      <Link
        href="https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf"
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{
          display: "inline-block",
          color: theme.palette.secondary.main,
          fontSize: "1rem",
          fontWeight: "bold",
          mb: 2,
          "&:hover": {
            color: theme.palette.secondary.dark,
            textDecoration: "underline",
          },
        }}
      >
        Click here to see charts
      </Link>
      <List>
        {wrongChoices.map((choice, index) => (
          <ListItem key={index} sx={{ flexDirection: "column", alignItems: "stretch", mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Hand: {choice.handNotation}
            </Typography>
            <Box sx={{ display: isDesktop ? "flex" : "block", gap: 2 }}>
              <Paper
                elevation={1}
                sx={{ flex: 1, p: 1, mb: isDesktop ? 0 : 1, backgroundColor: theme.palette.action.hover }}
              >
                <Typography variant="body2">
                  <strong>Situation:</strong> {choice.position.split(" - ")[0]}
                  <br />
                  <strong>Villain:</strong> {choice.position.split(" - ")[2]}
                  <br />
                  <strong>Hero:</strong> {choice.position.split(" - ")[1]}
                </Typography>
              </Paper>
              <Paper elevation={1} sx={{ flex: 1, p: 1 }}>
                <Typography variant="body2" color="error.main" sx={{ fontStyle: "italic" }}>
                  Your choice: {choice.yourChoice}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ fontWeight: "bold", mt: 1 }}>
                  Correct choice: {choice.correctDecision}
                </Typography>
              </Paper>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default IncorrectAnswers;
