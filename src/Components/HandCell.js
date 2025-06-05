import React from 'react';
import { COLORS } from '../Constants/Colors';

const HandCell = ({ hand, isSelected, onClick, isHighlighted = false, isCorrectActionRange, isIncorrectActionRange }) => {
  const cellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${COLORS.handBorder}`,
    cursor: 'pointer',
    fontSize: '0.8rem',
    padding: '2px',
    textAlign: 'center',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    backgroundColor: 'white', // Default background color
  };

  // Determine background color based on props
  if (isCorrectActionRange) {
    cellStyle.backgroundColor = COLORS.correctRangeBg;
  } else if (isIncorrectActionRange) {
    cellStyle.backgroundColor = COLORS.incorrectRangeBg;
  } else if (isSelected) {
    cellStyle.backgroundColor = COLORS.handSelectedBg; // Light green for selected cells
  }

  // Apply highlight style if needed, without overriding background
  if (isHighlighted) {
    cellStyle.outline = `2px solid ${COLORS.highlightGold}`;
    cellStyle.outlineOffset = '-1px';
  }

  return (
    <div
      style={cellStyle}
      onClick={() => onClick && onClick(hand)}
      title={hand}
    >
      {hand}
    </div>
  );
};

export default HandCell;
