import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Chip, Paper, ButtonBase, useTheme } from '@mui/material'; // Added Paper, ButtonBase, useTheme
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReadOnlyStrategyChartViewer from './ReadOnlyStrategyChartViewer';
import StyleIcon from '@mui/icons-material/Style';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '93vw', sm: '88vw', md: '78vw', lg: '68vw', xl: '58vw' }, // More responsive width
  maxWidth: 1000, // Max width
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1, // Adjusted overall padding
};

const ChartDisplayModal = ({ open, onClose, title, wrongChoices }) => {
  const theme = useTheme(); // Added useTheme
  const [currentDetailedHand, setCurrentDetailedHand] = useState(null);

  useEffect(() => {
    if (open && wrongChoices && wrongChoices.length > 0) {
      setCurrentDetailedHand(wrongChoices[0]);
      console.log('currentDetailedHand initialized:', wrongChoices[0]);
    } else if (!open) { // Reset when modal closes
      setCurrentDetailedHand(null);
    }
  }, [wrongChoices, open]);

  const handleHandSelect = (handData) => {
    setCurrentDetailedHand(handData);
    console.log('currentDetailedHand selected:', handData);
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: wrongChoices && wrongChoices.length > 0 ? Math.min(wrongChoices.length, 4) : 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    // nextArrow: <SampleNextArrow />, // Add if custom arrows are imported and used
    // prevArrow: <SamplePrevArrow />, // Add if custom arrows are imported and used
    responsive: [
      {
        breakpoint: 600, // for sm screens
        settings: {
          slidesToShow: wrongChoices && wrongChoices.length > 0 ? Math.min(wrongChoices.length, 3) : 1,
        }
      },
      {
        breakpoint: 480, // for xs screens
        settings: {
          slidesToShow: 1, // Always show 1 on very small screens if items exist
        }
      }
    ]
  };

  // Derive details from currentDetailedHand
  const situationKey = currentDetailedHand ? currentDetailedHand.situationKey : '';
  const positionKey = currentDetailedHand ? currentDetailedHand.positionKey : '';
  const decisionKey = currentDetailedHand ? currentDetailedHand.correctDecision : ''; // Corrected: use correctDecision
  const handNotation = currentDetailedHand ? currentDetailedHand.handNotation : '';
  const yourChoice = currentDetailedHand ? currentDetailedHand.yourChoice : ''; // This is the user's incorrect choice
  const positionString = currentDetailedHand ? currentDetailedHand.position : '';


  const positionParts = typeof positionString === 'string' ? positionString.split(" - ") : [];
  const situationDisplay = positionParts[0] || 'N/A';
  const heroPositionDisplay = positionParts[1] || 'N/A';
  const villainPositionDisplay = positionParts[2] || 'N/A';

  const isSelectedHand = (hand) => {
    return currentDetailedHand &&
           currentDetailedHand.handNotation === hand.handNotation &&
           currentDetailedHand.situationKey === hand.situationKey &&
           currentDetailedHand.positionKey === hand.positionKey &&
           currentDetailedHand.yourChoice === hand.yourChoice;
  };

  // Log props and conditions for ReadOnlyStrategyChartViewer
  if (open) { // Only log when modal is open to avoid excessive logging
    console.log('Chart Display Check:');
    console.log('  currentDetailedHand:', currentDetailedHand);
    console.log('  situationKey:', situationKey);
    console.log('  positionKey:', positionKey);
    console.log('  decisionKey (for condition and prop):', decisionKey);
    console.log('  handNotation (for handToHighlight):', handNotation);
    console.log('  yourChoice (for incorrectActionName):', yourChoice);
    console.log('  Condition for chart render (currentDetailedHand && situationKey && positionKey && decisionKey):', Boolean(currentDetailedHand && situationKey && positionKey && decisionKey));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-modal-title"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', maxHeight: 'calc(90vh - 32px)', gap: 2 }}>
          {/* Left Column for Chart & Carousel */}
          <Box sx={{ flex: { xs: '1 1 100%', md: 1.75 }, display: 'flex', flexDirection: 'column', p: { xs: 1, sm: 1.5 }, overflowY: 'auto', gap: 2 }}>
            { (wrongChoices && wrongChoices.length > 0) ? (
              <>
                {/* Carousel of incorrect plays */}
                <Box sx={{ width: '100%', px: {xs: 0, sm: 1 } }}>
                  <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mt: currentDetailedHand ? 2 : 0, fontWeight:'500', fontSize:'1.1rem' }}>
                    Your Incorrect Plays
                  </Typography>
                  <Slider {...carouselSettings}>
                    {wrongChoices.map((choice, index) => (
                      <Box key={index} sx={{ p: 0.5 }}>
                        <Paper
                          elevation={isSelectedHand(choice) ? 6 : 2}
                          sx={{
                            p: theme.spacing(0.5), // Adjusted padding
                            m: theme.spacing(0.25), // Adjusted margin
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '2px solid',
                            borderColor: isSelectedHand(choice) ? '#FFD700' : 'grey.300',
                            backgroundColor: isSelectedHand(choice) ? theme.palette.action.selected : theme.palette.background.paper,
                            minWidth: '60px', // Adjusted minWidth
                            transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.03)',
                              borderColor: isSelectedHand(choice) ? '#FFD700' : theme.palette.primary.light,
                              boxShadow: theme.shadows[4],
                            },
                          }}
                          onClick={() => handleHandSelect(choice)}
                        >
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'medium' }}>{choice.handNotation}</Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Slider>
                </Box>
                {/* Render chart viewer only if there's a hand selected, otherwise it might show its own placeholder or nothing */}
                {currentDetailedHand && situationKey && positionKey && decisionKey && (
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
              <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                No incorrect plays to display.
              </Typography>
            )}
          </Box>

          {/* Right Column for Details, Legend, Button */}
          <Box sx={{ flex: { xs: '1 1 100%', md: 1 }, p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', overflowY: 'auto', gap: 2 }}>
            <Typography id="chart-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', mb:1, fontWeight:'bold' }}>
              {title || "Review Your Play"}
            </Typography>

            <> {/* Add this fragment */}
              {/* Game Context Section */}
              {currentDetailedHand && ( // Only show context if a hand is selected
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight:'bold', color: theme.palette.text.primary}}>Game Context</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                <InfoOutlinedIcon sx={{ mr: 1, color: theme.palette.action.active, fontSize:'1.2rem' }} />
                <Typography variant="body1"><strong>Situation:</strong> {situationDisplay}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                <PersonIcon sx={{ mr: 1, color: theme.palette.success.dark, fontSize:'1.2rem' }} />
                <Typography variant="body1"><strong>Hero:</strong> <Box component="span" sx={{ color: theme.palette.success.dark }}>{heroPositionDisplay.replace('Hero: ', '')}</Box></Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsKabaddiIcon sx={{ mr: 1, color: theme.palette.error.dark, fontSize:'1.2rem' }} />
                <Typography variant="body1"><strong>Villain:</strong> <Box component="span" sx={{ color: theme.palette.error.dark }}>{villainPositionDisplay.replace('Villain: ', '')}</Box></Typography>
              </Box>
              </Paper>
              )}

              {/* Play Analysis Section */}
              {currentDetailedHand && ( // Only show analysis if a hand is selected
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight:'bold', color: theme.palette.text.primary}}>Play Analysis</Typography>
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                    <StyleIcon sx={{ mr: 1, fontSize: '1.2rem', color: theme.palette.info.main }} />
                    <Typography variant="body1" sx={{ wordBreak: 'break-word', fontWeight: 'bold' }}>
                      Your Hand: {handNotation}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                    <HighlightOffIcon sx={{ mr: 1, fontSize: '1.2rem', color: theme.palette.error.main }} />
                    <Typography variant="body1" sx={{ wordBreak: 'break-word', color: theme.palette.error.main }}>
                      Your Decision: {yourChoice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlineIcon sx={{ mr: 1, fontSize: '1.2rem', color: theme.palette.success.main }} />
                    <Typography variant="body1" sx={{ wordBreak: 'break-word', color: theme.palette.success.main }}>
                      Correct Decision: {decisionKey}
                    </Typography>
                  </Box>
                </>
              </Paper>
              )}

              {/* Chart Legend Section */}
              {currentDetailedHand && ( // Only show legend if a hand is selected (relevant to chart)
              <Paper elevation={2} sx={{ p: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight:'bold', color: theme.palette.text.primary}}>Legend</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.75 }}>
                  <Chip
                    icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'lightblue', border: '1px solid grey' }} />} // Adjusted size
                    label="Optimal play for this action"
                    size="small"
                    sx={{height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' }}}
                  />
                  <Chip
                    icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'rgba(255, 0, 0, 0.3)', border: '1px solid grey' }} />} // Adjusted size
                    label="Your incorrect play's range"
                    size="small"
                    sx={{height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' }}}
                  />
                  <Chip
                    icon={<Box sx={{ width: 12, height: 12, borderRadius: '2px', border: '2px solid #FFD700', backgroundColor: 'transparent' }} />} // Adjusted size
                    label="Specific hand in question on chart"
                    size="small"
                    sx={{height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' }}}
                  />
                </Box>
              </Paper>
              )}
            </> {/* Close this fragment */}
            <Box sx={{flexGrow: 1}} /> {/* Pushes button to bottom */}
            <Button onClick={onClose} variant="contained" color="primary" sx={{ width: '100%', mt:1, py: 1.25, fontWeight:'bold' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChartDisplayModal;
