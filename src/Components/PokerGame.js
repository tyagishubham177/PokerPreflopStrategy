import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import CardDisplay from './CardDisplay';
import DecisionButtons from './DecisionButtons';
import GameOver from './GameOver';
import RulesDialog from './RulesDialog';
import SettingsDialog from './SettingsDialog';
import usePokerGame from '../Hooks/UsePokerGame';
import { InfoIcon } from '../Constants/GameConstants';

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
    makeDecision,
    restartGame,
    handleStrategyChange,
    saveStrategy,
  } = usePokerGame();

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
      <CardHeader title="Poker Decision Game" />
      <CardContent>
        {!gameOver ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Typography>Score: {score}</Typography>
              <Typography>High Score: {highScore}</Typography>
            </div>
            <CardDisplay hand={hand} />
            <Typography align="center" style={{ marginBottom: 16 }}>
              Position: {position}
              <br />
              Situation: {situation}
              <br />
              <InfoIcon onClick={() => setShowRules(true)} />
            </Typography>
            <Typography align="center" style={{ marginBottom: 16 }}>
              What's your decision?
            </Typography>
            <DecisionButtons makeDecision={makeDecision} />
            <div style={{ marginBottom: 16 }}>
              <Typography>Lives: {lives}</Typography>
              <LinearProgress variant="determinate" value={(lives / 3) * 100} />
            </div>
            <Typography align="center">
              Streak: {streak} {streak > 0 && <span> (+{streak * 10}% bonus)</span>}
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
        <Button startIcon={<Settings />} style={{ marginTop: 16 }} onClick={() => setShowSettings(true)}>
          Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokerGame;