import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box, Tabs, Tab, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";
import SettingsTab from "./SettingsTab";
import usePokerGame from "../Hooks/UsePokerGame";
import pokerImage from "../Assets/pokerlogo512.png";
import wallpaperImage from "../Assets/wallpaper.png";

const PokerGame = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

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

  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 2000); // 1 second
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
  };

  useEffect(() => {
    let timer;
    if (collapsed) {
      timer = setTimeout(() => {
        setCollapsed(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [collapsed]);

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
        overflow: "hidden",
        p: 0,
        m: 0,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "95%",
          boxShadow: 3,
          margin: "auto",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: {
            xs: collapsed ? "10vh" : "85vh", // Adjusted height for mobile devices when collapsed
            sm: collapsed ? "10vh" : "90vh", // Adjusted height for larger screens when collapsed
          },
          transition: "height 0.5s", // Smooth transition
        }}
      >
        <CardHeader
          avatar={<Avatar src={pokerImage} sx={{ width: 56, height: 56 }} />}
          action={
            <IconButton
              aria-label="info"
              onClick={() => setShowRules(true)}
              onMouseDown={handleLongPressStart}
              onMouseUp={handleLongPressEnd}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              sx={{ color: "white" }}
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
            py: 1,
          }}
        />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{
            backgroundColor: "primary.light",
            "& .MuiTab-root": { color: "white", fontWeight: "bold" },
            "& .Mui-selected": { color: "#32CD32", backgroundColor: "primary.dark" }, // Sharp lime-green color for selected tab
          }}
        >
          <Tab label="Game" />
          <Tab label="Settings" />
        </Tabs>
        <CardContent
          sx={{
            p: { xs: 1, md: 2 },
            flex: 1,
            overflowY: "auto",
            height: {
              xs: collapsed ? "0" : "calc(85vh - 150px)", // Adjust based on header and tab heights for mobile devices when collapsed
              sm: collapsed ? "0" : "calc(90vh - 150px)", // Adjust based on header and tab heights for larger screens when collapsed
            },
            transition: "height 0.5s", // Smooth transition
          }}
        >
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
