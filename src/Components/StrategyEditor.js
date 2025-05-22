import React, { useState, useEffect } from 'react';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const StrategyEditor = ({ initialHands = [], onSelectionChange }) => {
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

  const getHandRepresentation = (rank1, rank2) => {
    const index1 = ranks.indexOf(rank1);
    const index2 = ranks.indexOf(rank2);

    if (index1 === index2) {
      return rank1 + rank2; // Pocket pair
    } else if (index1 < index2) {
      return rank1 + rank2 + 's'; // Suited
    } else {
      return rank2 + rank1 + 'o'; // Offsuit (higher rank first)
    }
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${ranks.length}, 1fr)`,
    gridTemplateRows: `repeat(${ranks.length}, 1fr)`,
    width: '400px', // Adjust as needed
    height: '400px', // Adjust as needed
    border: '1px solid #ccc',
  };

  const cellStyle = (hand) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: selectedHands.has(hand) ? 'lightblue' : 'white',
    fontSize: '0.8rem', // Adjusted for legibility
    padding: '2px', // Added padding
    textAlign: 'center', // Ensure text is centered
  });

  return (
    <div style={gridStyle}>
      {ranks.map((rank1) =>
        ranks.map((rank2) => {
          const hand = getHandRepresentation(rank1, rank2);
          return (
            <div
              key={hand}
              style={cellStyle(hand)}
              onClick={() => handleHandClick(hand)}
            >
              {hand}
            </div>
          );
        })
      )}
    </div>
  );
};

export default StrategyEditor;
