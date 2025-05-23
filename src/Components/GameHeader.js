import React from 'react';
import { Avatar, Box, IconButton, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import pokerImage from "../Assets/pokerlogo512.png";

const GameHeader = ({ 
  onInfoClick, 
  onLongPressStart, 
  onLongPressEnd,
  lives,
  hints,
  timer,
  useHint,
  difficulty // difficulty is available if needed for logic, not explicitly displayed here
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        backgroundColor: "primary.main",
        color: "white", // Ensure default text color is white for the header
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={pokerImage} sx={{ width: 40, height: 40, mr: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          {Array(lives).fill(0).map((_, i) => (
            <FavoriteIcon key={i} sx={{ color: "error.light", fontSize: '1.5rem' }} />
          ))}
        </Box>
        <Button 
          variant="contained" 
          onClick={useHint} 
          disabled={hints <= 0}
          size="small"
          startIcon={<LightbulbOutlinedIcon />}
          sx={{ 
            mr: 2,
            backgroundColor: hints > 0 ? "secondary.main" : "action.disabledBackground",
            '&:hover': {
              backgroundColor: hints > 0 ? "secondary.dark" : "action.disabledBackground",
            }
          }}
        >
          Hints: {hints}
        </Button>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Time: {timer}s
        </Typography>
      </Box>
      
      {/* Title can be removed or kept if space allows, for now, let's keep it simple */}
      {/* <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", flexGrow: 1, textAlign: 'center' }}>
        Learn Preflop Strategy
      </Typography> */}

      <IconButton
        aria-label="info"
        onClick={onInfoClick}
        onMouseDown={onLongPressStart}
        onMouseUp={onLongPressEnd}
        onTouchStart={onLongPressStart}
        onTouchEnd={onLongPressEnd}
        sx={{ color: "white" }}
      >
        <InfoIcon />
      </IconButton>
    </Box>
  );
};

export default GameHeader;
