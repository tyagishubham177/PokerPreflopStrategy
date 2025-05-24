import React from 'react';

const HandCell = ({ hand, isSelected, onClick, isHighlighted = false, isInRangeToHighlight }) => {
  const cellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: isSelected ? 'lightblue' : 'white',
    fontSize: '0.8rem',
    padding: '2px',
    textAlign: 'center',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  };

  if (isInRangeToHighlight) {
    cellStyle.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Light reddish
  }

  // Apply highlighting styles
  if (isHighlighted) {
    cellStyle.outline = '2px solid #FFD700'; // Gold outline
    cellStyle.outlineOffset = '-1px'; // Keep outline inside cell boundaries
  }

  return (
    <div
      style={cellStyle}
      onClick={() => onClick(hand)}
      title={hand} 
    >
      {hand}
    </div>
  );
};

export default HandCell;
