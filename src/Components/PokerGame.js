import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box, Grid, Tabs, Tab } from "@mui/material";
import CardDisplay from "./CardDisplay";
import DecisionButtons from "./DecisionButtons";
import GameOver from "./GameOver";
import RulesDialog from "./RulesDialog";
import SettingsTab from "./SettingsTab";
import IncorrectAnswers from "./IncorrectAnswers";
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
      }}
    >
      <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 3 }}>
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
            !gameOver ? (
              <>
                <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="h6">Score: {score}</Typography>
                  <Typography variant="h6">High Score: {highScore}</Typography>
                </Grid>
                <CardDisplay hand={hand} />
                <Box sx={{ textAlign: "center", my: 2 }}>
                  <Typography variant="body1">
                    Situation: {situation}
                    <br />
                    Position: {position}
                  </Typography>
                </Box>
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                  What's your decision?
                </Typography>
                <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} />
                <Box sx={{ my: 2 }}>
                  <Typography variant="body2">Lives: {lives}</Typography>
                </Box>
                <Typography align="center" sx={{ fontWeight: "bold" }}>
                  Streak: {streak} {streak > 0 && <span>(+{streak * 10}% bonus)</span>}
                </Typography>
              </>
            ) : (
              <>
                <GameOver score={score} highScore={highScore} restartGame={restartGame} />
                <IncorrectAnswers wrongChoices={wrongChoices} />
              </>
            )
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
