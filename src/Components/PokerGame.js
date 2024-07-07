import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box, Tabs, Tab } from "@mui/material";
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
        p: { xs: 2, md: 4 }, // Responsive padding
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3, margin: { xs: "10px", sm: "auto" } }}>
        <CardHeader
          avatar={<Avatar src={pokerImage} />}
          title={
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Learn Preflop Strategy
            </Typography>
          }
          sx={{ backgroundColor: "primary.main", color: "white", textAlign: "center" }}
        />
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Game" />
          <Tab label="Settings" />
        </Tabs>
        <CardContent>
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
