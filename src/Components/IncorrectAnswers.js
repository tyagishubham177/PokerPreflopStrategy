import React, { useState } from "react";
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery, Link } from "@mui/material";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

const IncorrectAnswers = ({ wrongChoices }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Paper
      elevation={1}
      sx={{
        mt: 3,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textAlign: "center",
          mb: 3,
          fontSize: "1.5rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Incorrect Answers
      </Typography>
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
      <Grid
        container
        spacing={3}
        sx={{ overflowY: isDesktop ? "visible" : "scroll", maxHeight: isDesktop ? "none" : "300px" }}
      >
        {wrongChoices.slice(0, 3).map((choice, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{
              display: "block",
              marginBottom: isDesktop ? 0 : "10px",
              "&:last-child": {
                marginBottom: 0,
              },
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Paper
                elevation={3}
                sx={{
                  height: "125px", // Halved the height
                  p: 1, // Less padding
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: "12px",
                  position: "relative",
                  transition: "all 0.6s ease",
                  transformStyle: "preserve-3d",
                  transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0)",
                  cursor: "pointer",
                }}
                onClick={() => toggleFlip(index)}
              >
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
                    justifyContent: "flex-start", // Align top
                    p: 1, // Add padding to create space
                    opacity: flippedCards[index] ? 0 : 1, // Make invisible during flip
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      textAlign: "left",
                      color: theme.palette.primary.main,
                      fontSize: "0.875rem",
                    }} // Align text to the left and make it smaller
                  >
                    Hand: {choice.handNotation}
                  </Typography>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, textAlign: "left", fontSize: "0.75rem" }}>
                      <strong>Situation:</strong> {choice.position.split(" - ")[0]}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, color: theme.palette.error.main, textAlign: "left", fontSize: "0.75rem" }}
                    >
                      <strong>Villain:</strong> {choice.position.split(" - ")[2]}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.success.main, textAlign: "left", fontSize: "0.75rem" }}
                    >
                      <strong>Hero:</strong> {choice.position.split(" - ")[1]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px", // Adjusted position
                      right: "5px", // Adjusted position
                      zIndex: 10,
                      color: theme.palette.text.secondary,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      padding: "3px", // Smaller padding
                      transform: "translate(-50%, -50%)", // Adjusting position based on flip state
                    }}
                  >
                    <RotateCw size={16} />
                  </Box>
                </Box>
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
                    p: 1, // Add padding to create space
                    transform: "rotateY(180deg)",
                    backgroundColor: theme.palette.grey[200],
                    borderRadius: "12px",
                    opacity: flippedCards[index] ? 1 : 0, // Make invisible during flip
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="error.main"
                    sx={{ fontStyle: "italic", textAlign: "center", mb: 2, fontSize: "0.875rem" }} // Smaller text
                  >
                    Your choice: {choice.yourChoice}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="success.main"
                    sx={{ fontWeight: "bold", textAlign: "center", fontSize: "0.875rem" }} // Smaller text
                  >
                    Correct choice: {choice.correctDecision}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px", // Adjusted position
                      left: "5px", // Adjusted position
                      zIndex: 10,
                      color: theme.palette.text.secondary,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      padding: "3px", // Smaller padding
                    }}
                  >
                    <RotateCw size={16} />
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default IncorrectAnswers;
