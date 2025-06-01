import React from 'react';
import { Typography, Box } from '@mui/material';
import StrategyEditor from './StrategyEditor';
import { initialPokerStrategy } from '../Constants/InitialStrategy';
import { SITUATION_LABELS, POSITION_LABELS } from '../Constants/GameLabels';

const ReadOnlyStrategyChartViewer = ({ situationKey, positionKey, decisionKey, handToHighlight = null, incorrectActionName }) => {
  const hands = initialPokerStrategy[situationKey]?.[positionKey]?.[decisionKey] || [];

  let incorrectActionHands = [];
  if (incorrectActionName && initialPokerStrategy[situationKey]?.[positionKey]) {
    incorrectActionHands = initialPokerStrategy[situationKey][positionKey][incorrectActionName] || [];
  }

  const situationLabel = SITUATION_LABELS[situationKey] || situationKey;
  const positionData = POSITION_LABELS[positionKey];
  let positionLabel = positionKey;
  if (positionData) {
    if (positionData.villain === "N/A" || !positionData.villain) {
      positionLabel = `Hero: ${positionData.hero}`;
    } else {
      positionLabel = `Hero: ${positionData.hero} vs Villain: ${positionData.villain}`;
    }
  }
  
  // const title = `Chart for: ${situationLabel} - ${positionLabel} - Action: ${decisionKey}`; // Removed as it's redundant

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Typography component displaying the title has been removed */}
      <StrategyEditor
        initialHands={hands}
        isReadOnly={true}
        highlightedHand={handToHighlight}
        correctActionHandsList={hands}
        incorrectActionHandsList={incorrectActionHands}
      />
    </Box>
  );
};

export default ReadOnlyStrategyChartViewer;
