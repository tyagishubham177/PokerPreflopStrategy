import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box, Tabs, Tab, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";
import SettingsTab from "./SettingsTab";
import usePokerGame from "../Hooks/UsePokerGame";
import pokerImage from "../Assets/pokerlogo512.png";
import wallpaperImage from "../Assets/wallpaper.png";

const PokerGame = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    hand,
    position,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    situation,
    availableActions,
    makeDecision,
    restartGame,
    wrongChoices,
  } = usePokerGame();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${wallpaperImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <Card sx={{ 
        maxWidth: 600, 
        width: "100%", 
        boxShadow: 3, 
        margin: { xs: "10px", sm: "auto" },
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <CardHeader
          avatar={<Avatar src={pokerImage} sx={{ width: 56, height: 56 }} />}
          action={
            <IconButton 
              aria-label="info" 
              onClick={() => setShowRules(true)}
              sx={{ color: 'white' }}
            >
              <InfoIcon />
            </IconButton>
          }
          title={
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Learn Preflop Strategy
            </Typography>
          }
          sx={{ 
            backgroundColor: "primary.main", 
            color: "white", 
            textAlign: "center",
            py: 2,
          }}
        />
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{ 
            backgroundColor: "primary.light",
            '& .MuiTab-root': { color: 'white' },
            '& .Mui-selected': { color: 'secondary.main' },
          }}
        >
          <Tab label="Game" />
          <Tab label="Settings" />
        </Tabs>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          {activeTab === 0 ? (
            <PokerGameTab
              gameOver={gameOver}
              score={score}
              highScore={highScore}
              hand={hand}
              situation={situation}
              position={position}
              availableActions={availableActions}
              makeDecision={makeDecision}
              lives={lives}
              streak={streak}
              restartGame={restartGame}
              wrongChoices={wrongChoices}
            />
          ) : (
            <SettingsTab />
          )}
          <RulesDialog showRules={showRules} setShowRules={setShowRules} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PokerGame;