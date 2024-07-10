import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Avatar, Box, IconButton, SwipeableDrawer, Fab } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";
import SettingsTab from "./SettingsTab";
import usePokerGame from "../Hooks/UsePokerGame";
import pokerImage from "../Assets/pokerlogo512.png";
import wallpaperImage from "../Assets/wallpaper.png";

const PokerGame = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [longPress, setLongPress] = useState(false);

  const longPressTimeout = useRef(null);

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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

  const handleLongPressStart = () => {
    longPressTimeout.current = setTimeout(() => {
      setCollapsed(true);
      setLongPress(false);
    }, 2000); // 2 seconds
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleClick = () => {
    if (!longPress) {
      setShowRules(true);
    }
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
        overflow: "hidden",
        p: 0,
        m: 0,
      }}
    >
      {!collapsed && (
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
              xs: "80vh",
              sm: "85vh",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              backgroundColor: "primary.main",
            }}
          >
            <Avatar src={pokerImage} sx={{ width: 40, height: 40 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
              Learn Preflop Strategy
            </Typography>
            <IconButton
              aria-label="info"
              onClick={handleClick}
              onMouseDown={handleLongPressStart}
              onMouseUp={handleLongPressEnd}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              sx={{ color: "white" }}
            >
              <InfoIcon />
            </IconButton>
          </Box>

          <CardContent
            sx={{
              p: { xs: 2, md: 3 },
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
          </CardContent>
          <RulesDialog showRules={showRules} setShowRules={setShowRules} />
        </Card>
      )}

      <Fab
        color="primary"
        aria-label="settings"
        onClick={toggleSettings}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "custom.main",
          "&:hover": { backgroundColor: "custom.dark" },
        }}
      >
        <SettingsIcon />
      </Fab>

      <SwipeableDrawer anchor="right" open={showSettings} onClose={toggleSettings} onOpen={toggleSettings}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Settings</Typography>
            <IconButton onClick={toggleSettings}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SettingsTab />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default PokerGame;
