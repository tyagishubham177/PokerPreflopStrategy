import React from 'react';

const HandCell = ({ hand, isSelected, onClick }) => {
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
