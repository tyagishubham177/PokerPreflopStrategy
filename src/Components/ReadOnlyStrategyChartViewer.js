import React from 'react';
import { Typography, Box } from '@mui/material';
import StrategyEditor from './StrategyEditor';
import { initialPokerStrategy } from '../Constants/InitialStrategy';
import { SITUATION_LABELS, POSITION_LABELS } from '../Constants/GameLabels';

const ReadOnlyStrategyChartViewer = ({ situationKey, positionKey, decisionKey, handToHighlight = null }) => {
  // Defensive lookup for hands
  const hands = initialPokerStrategy[situationKey]?.[positionKey]?.[decisionKey] || [];

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
        initialHands={hands}
        isReadOnly={true}
        highlightedHand={handToHighlight} // Add this line
        // onSelectionChange can be omitted as it's read-only
      />
    </Box>
  );
};

export default ReadOnlyStrategyChartViewer;
