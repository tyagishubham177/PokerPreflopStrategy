import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  ButtonBase,
  useTheme,
  IconButton,
} from "@mui/material"; // Added IconButton
import { COLORS } from "../Constants/Colors";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReadOnlyStrategyChartViewer from "./ReadOnlyStrategyChartViewer";
import StyleIcon from "@mui/icons-material/Style";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: "85vw", md: "75vw", lg: "65vw", xl: "55vw" }, // More responsive width
  maxWidth: 1000, // Max width
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: `2px solid ${COLORS.chartModalBorder}`,
  boxShadow: 24,
  p: 1, // Adjusted overall padding
};

const ChartDisplayModal = ({ open, onClose, title, wrongChoices }) => {
  const theme = useTheme(); // Added useTheme
  const { t } = useTranslation();
  const [currentDetailedHand, setCurrentDetailedHand] = useState(null);

  useEffect(() => {
    if (open && wrongChoices && wrongChoices.length > 0) {
      setCurrentDetailedHand(wrongChoices[0]);
    } else if (!open) {
      // Reset when modal closes
      setCurrentDetailedHand(null);
    }
  }, [wrongChoices, open]);

  const handleHandSelect = (handData) => {
    setCurrentDetailedHand(handData);
  };

  const carouselSettings = {
    dots: true,
    infinite: false,
    arrows: false, // Add this line
    speed: 500,
    slidesToShow:
      wrongChoices && wrongChoices.length > 0
        ? Math.min(wrongChoices.length, 6)
        : 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600, // for sm screens
        settings: {
          slidesToShow:
            wrongChoices && wrongChoices.length > 0
              ? Math.min(wrongChoices.length, 4)
              : 1,
        },
      },
      {
        breakpoint: 480, // for xs screens
        settings: {
          slidesToShow:
            wrongChoices && wrongChoices.length > 0
              ? Math.min(wrongChoices.length, 2)
              : 1, // Always show 1 on very small screens if items exist
        },
      },
    ],
  };

  // Derive details from currentDetailedHand
  const situationKey = currentDetailedHand
    ? currentDetailedHand.situationKey
    : "";
  const positionKey = currentDetailedHand
    ? currentDetailedHand.positionKey
    : "";
  const decisionKey = currentDetailedHand
    ? currentDetailedHand.correctDecision
    : ""; // Corrected: use correctDecision
  const handNotation = currentDetailedHand
    ? currentDetailedHand.handNotation
    : "";
  const yourChoice = currentDetailedHand ? currentDetailedHand.yourChoice : ""; // This is the user's incorrect choice
  const positionString = currentDetailedHand
    ? currentDetailedHand.position
    : "";

  const positionParts =
    typeof positionString === "string" ? positionString.split(" - ") : [];
  const situationDisplay = positionParts[0] || "N/A";
  const heroPositionDisplay = positionParts[1] || "N/A";
  const villainPositionDisplay = positionParts[2] || "N/A";

  const isSelectedHand = (hand) => {
    return (
      currentDetailedHand &&
      currentDetailedHand.handNotation === hand.handNotation &&
      currentDetailedHand.situationKey === hand.situationKey &&
      currentDetailedHand.positionKey === hand.positionKey &&
      currentDetailedHand.yourChoice === hand.yourChoice
    );
  };

  // Logic to check if chart should render when modal is open
  if (open) {
    Boolean(currentDetailedHand && situationKey && positionKey && decisionKey);
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: COLORS.grey,
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: COLORS.grey,
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="chart-modal-title">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxHeight: "calc(90vh - 32px)",
            gap: 2,
          }}
        >
          {/* Left Column for Chart & Carousel */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: 1.75 },
              display: "flex",
              flexDirection: "column",
              p: { xs: 1, sm: 1.5 },
              overflowY: "auto",
              gap: 2,
            }}
          >
            {wrongChoices && wrongChoices.length > 0 ? (
              <>
                {/* Carousel of incorrect plays */}
                <Box sx={{ width: "100%", mx: "auto", px: 0, py: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      mt: 1,
                      mb: 0.5,
                      fontWeight: "500",
                      fontSize: "1.1rem",
                    }}
                  >
                    {t("yourIncorrectPlays")}
                  </Typography>
                  <Slider {...carouselSettings} className="incorrect-carousel">
                    {wrongChoices.map((choice, index) => (
                      <Box key={index} sx={{ p: 0.5 }}>
                        <Paper
                          elevation={isSelectedHand(choice) ? 6 : 2}
                          sx={{
                            padding: `${theme.spacing(1)} ${theme.spacing(1)}`, // Adjusted padding
                            m: theme.spacing(0.1), // Adjusted margin
                            textAlign: "center",
                            cursor: "pointer",
                            borderRadius: "8px",
                            border: "2px solid",
                            borderColor: isSelectedHand(choice)
                              ? COLORS.highlightGold
                              : "grey.300",
                            backgroundColor: isSelectedHand(choice)
                              ? theme.palette.action.selected
                              : theme.palette.background.paper,
                            minWidth: "45px", // Adjusted minWidth
                            minHeight: "60px", // Ensure items are taller
                            display: "flex", // Added for vertical centering
                            flexDirection: "column", // Added for vertical centering
                            justifyContent: "center", // Added for vertical centering
                            transition:
                              "transform 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.03)",
                              borderColor: isSelectedHand(choice)
                                ? COLORS.highlightGold
                                : theme.palette.primary.light,
                              boxShadow: theme.shadows[4],
                            },
                          }}
                          onClick={() => handleHandSelect(choice)}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: "medium",
                              lineHeight: "1.2",
                            }}
                          >
                            {choice.handNotation}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Slider>
                </Box>
                {/* Render chart viewer only if there's a hand selected, otherwise it might show its own placeholder or nothing */}
                {currentDetailedHand &&
                  situationKey &&
                  positionKey &&
                  decisionKey && (
                    <ReadOnlyStrategyChartViewer
                      situationKey={situationKey}
                      positionKey={positionKey}
                      decisionKey={decisionKey} // Correct decision for chart highlight
                      incorrectActionName={yourChoice} // User's incorrect action
                      handToHighlight={handNotation}
                    />
                  )}
              </>
            ) : (
              // This message shows only if wrongChoices is empty or null.
              <Typography
                sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
              >
                {t("noIncorrectPlays")}
              </Typography>
            )}
          </Box>

          {/* Right Column for Details, Legend, Button */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: 1 },
              p: { xs: 1, sm: 2 },
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              gap: 2,
            }}
          >
            <Typography
              id="chart-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
            >
              {title || t("reviewYourPlay")}
            </Typography>
            <>
              {" "}
              {/* Add this fragment */}
              {/* Game Context Section */}
              {currentDetailedHand && ( // Only show context if a hand is selected
                <Paper elevation={2} sx={{ p: 2, borderRadius: "8px" }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {t("gameContext")}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
                    <InfoOutlinedIcon
                      sx={{
                        mr: 1,
                        color: theme.palette.action.active,
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography variant="body1">
                      <strong>{t("situation")}:</strong> {situationDisplay}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
                    <PersonIcon
                      sx={{
                        mr: 1,
                        color: theme.palette.success.dark,
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography variant="body1">
                      <strong>{t("hero")}:</strong>{" "}
                      <Box
                        component="span"
                        sx={{ color: theme.palette.success.dark }}
                      >
                        {heroPositionDisplay.replace("Hero: ", "")}
                      </Box>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SportsKabaddiIcon
                      sx={{
                        mr: 1,
                        color: theme.palette.error.dark,
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography variant="body1">
                      <strong>{t("villain")}:</strong>{" "}
                      <Box
                        component="span"
                        sx={{ color: theme.palette.error.dark }}
                      >
                        {villainPositionDisplay.replace("Villain: ", "")}
                      </Box>
                    </Typography>
                  </Box>
                </Paper>
              )}
              {/* Play Analysis Section */}
              {currentDetailedHand && ( // Only show analysis if a hand is selected
                <Paper elevation={2} sx={{ p: 2, borderRadius: "8px" }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {t("playAnalysis")}
                  </Typography>
                  <>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.75 }}
                    >
                      <StyleIcon
                        sx={{
                          mr: 1,
                          fontSize: "1.2rem",
                          color: theme.palette.info.main,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ wordBreak: "break-word", fontWeight: "bold" }}
                      >
                        {t("yourHandLabel")}: {handNotation}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.75 }}
                    >
                      <HighlightOffIcon
                        sx={{
                          mr: 1,
                          fontSize: "1.2rem",
                          color: theme.palette.error.main,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          wordBreak: "break-word",
                          color: theme.palette.error.main,
                        }}
                      >
                        {t("yourDecisionLabel")}: {yourChoice}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleOutlineIcon
                        sx={{
                          mr: 1,
                          fontSize: "1.2rem",
                          color: theme.palette.success.main,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          wordBreak: "break-word",
                          color: theme.palette.success.main,
                        }}
                      >
                        {t("correctDecisionLabel")}: {decisionKey}
                      </Typography>
                    </Box>
                  </>
                </Paper>
              )}
              {/* Chart Legend Section */}
              {currentDetailedHand && ( // Only show legend if a hand is selected (relevant to chart)
                <Paper elevation={2} sx={{ p: 2, borderRadius: "8px" }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {t("understandingChart")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 0.75,
                    }}
                  >
                    <Chip
                      icon={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: COLORS.correctRangeBg,
                            border: `1px solid ${COLORS.grey}`,
                          }}
                        />
                      } // Adjusted size
                      label={t("optimalPlay")}
                      size="small"
                      sx={{
                        height: "auto",
                        "& .MuiChip-label": { whiteSpace: "normal" },
                        backgroundColor: COLORS.white,
                      }}
                    />
                    <Chip
                      icon={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: COLORS.incorrectRangeBg,
                            border: `1px solid ${COLORS.grey}`,
                          }}
                        />
                      } // Adjusted size
                      label={t("incorrectRange")}
                      size="small"
                      sx={{
                        height: "auto",
                        "& .MuiChip-label": { whiteSpace: "normal" },
                        backgroundColor: COLORS.white,
                      }}
                    />
                    <Chip
                      icon={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "2px",
                            border: `2px solid ${COLORS.highlightGold}`,
                            backgroundColor: "transparent",
                          }}
                        />
                      } // Adjusted size
                      label={t("specificHand")}
                      size="small"
                      sx={{
                        height: "auto",
                        "& .MuiChip-label": { whiteSpace: "normal" },
                        backgroundColor: COLORS.white,
                      }}
                    />
                  </Box>
                </Paper>
              )}
            </>{" "}
            {/* Close this fragment */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
