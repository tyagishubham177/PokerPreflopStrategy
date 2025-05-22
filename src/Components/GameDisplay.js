import React from 'react';
import { Card, CardContent, Box } from "@mui/material";
import GameHeader from "./GameHeader";
import PokerGameTab from "./PokerGameTab";
import RulesDialog from "./RulesDialog";

const GameDisplay = (props) => {
  const {
    collapsed,
    onInfoClick,
    onLongPressStart,
    onLongPressEnd,
    gameOver,
    score,
    highScore,
    hand,
    situation,
    position,
    availableActions,
    makeDecision,
    lives,
    streak,
    restartGame,
    wrongChoices,
    showRules,
    setShowRules,
  } = props;

  if (collapsed) {
    return null;
  }

  return (
    <Card
      sx={{
        maxWidth: 650,
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
      <GameHeader
        onInfoClick={onInfoClick}
        onLongPressStart={onLongPressStart}
        onLongPressEnd={onLongPressEnd}
      />
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
  );
};

export default GameDisplay;
