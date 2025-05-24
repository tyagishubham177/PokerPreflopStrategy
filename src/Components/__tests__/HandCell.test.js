import React from 'react';
import { render, screen } from '@testing-library/react';
import HandCell from '../HandCell';

describe('HandCell', () => {
  test('applies correct style when isInRangeToHighlight is true', () => {
    render(<HandCell hand="AKs" isSelected={false} onClick={() => {}} isInRangeToHighlight={true} />);
    const handCell = screen.getByText('AKs').parentElement; // Get the div container
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
  });

  test('applies correct style when isSelected is true and isInRangeToHighlight is false', () => {
    render(<HandCell hand="AQo" isSelected={true} onClick={() => {}} isInRangeToHighlight={false} />);
    const handCell = screen.getByText('AQo').parentElement;
    expect(handCell).toHaveStyle('background-color: lightblue');
  });

  test('applies correct style for default state (neither selected, highlighted, nor in range)', () => {
    render(<HandCell hand="AJs" isSelected={false} onClick={() => {}} isInRangeToHighlight={false} />);
    const handCell = screen.getByText('AJs').parentElement;
    expect(handCell).toHaveStyle('background-color: white');
  });

  test('applies highlight style when isHighlighted is true', () => {
    render(<HandCell hand="ATs" isSelected={false} onClick={() => {}} isHighlighted={true} />);
    const handCell = screen.getByText('ATs').parentElement;
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
    expect(handCell).toHaveStyle('outline-offset: -1px');
  });

  test('isInRangeToHighlight takes precedence over isSelected for background color', () => {
    render(<HandCell hand="KQs" isSelected={true} onClick={() => {}} isInRangeToHighlight={true} />);
    const handCell = screen.getByText('KQs').parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
  });

  test('isHighlighted style can be applied along with isInRangeToHighlight', () => {
    render(<HandCell hand="KJs" isSelected={false} onClick={() => {}} isHighlighted={true} isInRangeToHighlight={true} />);
    const handCell = screen.getByText('KJs').parentElement;
    expect(handCell).toHaveStyle('background-color: rgba(255, 0, 0, 0.3)');
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
  });

  test('isHighlighted style can be applied along with isSelected', () => {
    render(<HandCell hand="KTs" isSelected={true} onClick={() => {}} isHighlighted={true} isInRangeToHighlight={false} />);
    const handCell = screen.getByText('KTs').parentElement;
    expect(handCell).toHaveStyle('background-color: lightblue');
    expect(handCell).toHaveStyle('outline: 2px solid #FFD700');
  });
});
