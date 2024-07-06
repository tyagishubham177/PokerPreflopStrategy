import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  LinearProgress,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import CardDisplay from "./CardDisplay";
import DecisionButtons from "./DecisionButtons";
import GameOver from "./GameOver";
import RulesDialog from "./RulesDialog";
import SettingsDialog from "./SettingsDialog";
import usePokerGame from "../Hooks/UsePokerGame";
import { InfoIcon } from "../Constants/GameConstants";
import pokerImage from "../Assets/pokerlogo512.png";

const PokerGame = () => {
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
    showSettings,
    setShowSettings,
    editedStrategy,
    situation,
    availableActions,
    makeDecision,
    restartGame,
    handleStrategyChange,
    saveStrategy,
  } = usePokerGame();

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 4, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar src={pokerImage} />}
        title="Learn Poker Preflop Strategy"
        sx={{ backgroundColor: "primary.main", color: "white", textAlign: "center" }}
      />
      <CardContent>
        {!gameOver ? (
          <>
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6">Score: {score}</Typography>
              <Typography variant="h6">High Score: {highScore}</Typography>
            </Grid>
            <CardDisplay hand={hand} />
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Typography variant="body1">
                Position: {position}
                <br />
                Situation: {situation}
                <InfoIcon onClick={() => setShowRules(true)} sx={{ ml: 1, cursor: "pointer" }} />
              </Typography>
            </Box>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              What's your decision?
            </Typography>
            <DecisionButtons availableActions={availableActions} makeDecision={makeDecision} />
            <Box sx={{ my: 2 }}>
              <Typography variant="body2">Lives: {lives}</Typography>
              <LinearProgress
                variant="determinate"
                value={(lives / 3) * 100}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Typography align="center" sx={{ fontWeight: "bold" }}>
              Streak: {streak} {streak > 0 && <span>(+{streak * 10}% bonus)</span>}
            </Typography>
          </>
        ) : (
          <GameOver score={score} highScore={highScore} restartGame={restartGame} />
        )}
        <RulesDialog showRules={showRules} setShowRules={setShowRules} />
        <SettingsDialog
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          editedStrategy={editedStrategy}
          handleStrategyChange={handleStrategyChange}
          saveStrategy={saveStrategy}
        />
        <Button
          startIcon={<Settings />}
          sx={{ mt: 2, width: "100%" }}
          variant="outlined"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokerGame;
