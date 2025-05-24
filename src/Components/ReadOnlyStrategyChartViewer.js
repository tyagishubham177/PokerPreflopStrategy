import React from 'react';
import { Typography, Box } from '@mui/material';
import StrategyEditor from './StrategyEditor';
import { initialPokerStrategy } from '../Constants/InitialStrategy';
import { SITUATION_LABELS, POSITION_LABELS } from '../Constants/GameLabels';

const ReadOnlyStrategyChartViewer = ({ situationKey, positionKey, decisionKey, handToHighlight = null, incorrectActionName }) => {
  // Defensive lookup for hands (these are the correct action's hands)
  const hands = initialPokerStrategy[situationKey]?.[positionKey]?.[decisionKey] || [];

  let incorrectActionHands = [];
  if (incorrectActionName && initialPokerStrategy[situationKey]?.[positionKey]) {
    incorrectActionHands = initialPokerStrategy[situationKey][positionKey][incorrectActionName] || [];
  }

  // Constructing a title
  const situationLabel = SITUATION_LABELS[situationKey] || situationKey;
  const positionData = POSITION_LABELS[positionKey];
  let positionLabel = positionKey; // Fallback to key if no label found
  if (positionData) {
    if (positionData.villain === "N/A" || !positionData.villain) {
      positionLabel = `Hero: ${positionData.hero}`;
    } else {
      positionLabel = `Hero: ${positionData.hero} vs Villain: ${positionData.villain}`;
    }
  }
  
  const title = `Chart for: ${situationLabel} - ${positionLabel} - Action: ${decisionKey}`;

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <StrategyEditor
        initialHands={hands} // Base hands for the chart (correct action's hands)
        isReadOnly={true}
        highlightedHand={handToHighlight} // Single hand gold outline
        correctActionHandsList={hands} // Pass correct action hands
        incorrectActionHandsList={incorrectActionHands} // Pass incorrect action hands
      />
    </Box>
  );
};

export default ReadOnlyStrategyChartViewer;
