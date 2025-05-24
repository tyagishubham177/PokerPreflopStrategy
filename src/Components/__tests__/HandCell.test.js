import React from 'react';
import { render, screen } from '@testing-library/react';
import HandCell from '../HandCell';

describe('HandCell', () => {
  const defaultProps = {
    hand: 'AKs',
    isSelected: false, // isSelected is still a prop but doesn't directly set background
    onClick: jest.fn(),
    isHighlighted: false,
    isCorrectActionRange: false,
    isIncorrectActionRange: false,
  };

  test('applies default background color (white) when no ranges are active', () => {
    render(<HandCell {...defaultProps} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: white');
  });

  test('applies lightblue background for isCorrectActionRange={true}', () => {
    render(<HandCell {...defaultProps} isCorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: lightblue');
  });

  test('applies reddish background for isIncorrectActionRange={true}', () => {
    render(<HandCell {...defaultProps} isIncorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
  });

  test('isIncorrectActionRange takes precedence over isCorrectActionRange for background color', () => {
    render(<HandCell {...defaultProps} isCorrectActionRange={true} isIncorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
  });

  test('applies gold outline for isHighlighted={true} regardless of range props', () => {
    render(<HandCell {...defaultProps} isHighlighted={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
    expect(handCell).toHaveStyle('outline-offset: -1px');
  });

  test('applies gold outline when isHighlighted={true} and isCorrectActionRange={true}', () => {
    render(<HandCell {...defaultProps} isHighlighted={true} isCorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: lightblue');
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
  });

  test('applies gold outline when isHighlighted={true} and isIncorrectActionRange={true}', () => {
    render(<HandCell {...defaultProps} isHighlighted={true} isIncorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
  });

  test('applies gold outline when isHighlighted={true}, isCorrectActionRange={true}, and isIncorrectActionRange={true}', () => {
    render(<HandCell {...defaultProps} isHighlighted={true} isCorrectActionRange={true} isIncorrectActionRange={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)'); // Reddish takes precedence
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
  });
  
  test('isSelected prop does not affect background color directly', () => {
    render(<HandCell {...defaultProps} isSelected={true} />);
    const handCell = screen.getByText(defaultProps.hand).parentElement;
    expect(handCell).toHaveStyle('background-color: white'); // Should be default or determined by range props
  });
});
