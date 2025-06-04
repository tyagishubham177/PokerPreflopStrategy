import React, { useState, useEffect } from 'react';
import { getHandRepresentation, handMatrixRanks as ranks } from '../Utils/handUtils'; 
import HandCell from './HandCell'; 

const StrategyEditor = ({ initialHands = [], onSelectionChange, isReadOnly = false, highlightedHand = null, correctActionHandsList, incorrectActionHandsList }) => {
  const [selectedHands, setSelectedHands] = useState(new Set(initialHands));

  useEffect(() => {
    setSelectedHands(new Set(initialHands));
  }, [initialHands]);

  const handleHandClick = (hand) => {
    const newSelectedHands = new Set(selectedHands);
    if (newSelectedHands.has(hand)) {
      newSelectedHands.delete(hand);
    } else {
      newSelectedHands.add(hand);
    }
    setSelectedHands(newSelectedHands);
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelectedHands));
    }
  };


  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${ranks.length}, 1fr)`,
    gridTemplateRows: `repeat(${ranks.length}, 1fr)`,
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    maxWidth: '400px',
    border: '1px solid #ccc',
  };


  return (
    <div style={gridStyle}>
      {ranks.map((rank1) => 
        ranks.map((rank2) => { 
          const hand = getHandRepresentation(rank1, rank2);
          const isCorrectRange = correctActionHandsList && correctActionHandsList.includes(hand);
          const isIncorrectRange = incorrectActionHandsList && incorrectActionHandsList.includes(hand);
          
          return (
            <HandCell
              key={hand}
              hand={hand}
              isSelected={selectedHands.has(hand)}
              onClick={isReadOnly ? () => {} : handleHandClick} 
              isHighlighted={highlightedHand ? hand === highlightedHand : false} 
              isCorrectActionRange={isCorrectRange} 
              isIncorrectActionRange={isIncorrectRange} 
            />
          );
        })
      )}
    </div>
  );
};

export default StrategyEditor;
