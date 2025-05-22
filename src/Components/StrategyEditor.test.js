import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StrategyEditor from './StrategyEditor';

// Helper to generate all 169 hand combinations for checks
const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const getAllPossibleHands = () => {
  const hands = new Set();
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const rank1 = ranks[i];
      const rank2 = ranks[j];
      if (i === j) {
        hands.add(rank1 + rank2); // Pair
      } else if (i < j) {
        hands.add(rank1 + rank2 + 's'); // Suited
      } else {
        hands.add(rank2 + rank1 + 'o'); // Offsuit
      }
    }
  }
  return Array.from(hands);
};

describe('StrategyEditor', () => {
  const allHands = getAllPossibleHands();

  test('renders a 13x13 grid of 169 clickable hand elements', () => {
    render(<StrategyEditor />);
    allHands.forEach(hand => {
      expect(screen.getByText(hand)).toBeInTheDocument();
    });
    // Check total count by text (assuming each hand text is unique and present)
    // This indirectly checks for 169 elements if getAllPossibleHands is correct
    const handElements = allHands.map(hand => screen.getByText(hand));
    expect(handElements.length).toBe(169);
  });

  test('correctly highlights initialHands on render', () => {
    const initialHands = ['AA', 'KKs', 'AQo'];
    render(<StrategyEditor initialHands={initialHands} />);
    
    initialHands.forEach(hand => {
      const handElement = screen.getByText(hand);
      expect(handElement).toHaveStyle('background-color: lightblue');
    });

    // Check a non-selected hand
    const nonSelectedHand = '72o'; // A typically unselected hand
    if (allHands.includes(nonSelectedHand) && !initialHands.includes(nonSelectedHand)) {
        const nonSelectedElement = screen.getByText(nonSelectedHand);
        expect(nonSelectedElement).toHaveStyle('background-color: white');
    }
  });

  test('click on a hand cell toggles its selection state and calls onSelectionChange', () => {
    const mockOnSelectionChange = jest.fn();
    render(<StrategyEditor onSelectionChange={mockOnSelectionChange} />);
    
    const handToClick = 'AKs';
    const handElement = screen.getByText(handToClick);

    // Initial state: not selected
    expect(handElement).toHaveStyle('background-color: white');

    // First click: select
    fireEvent.click(handElement);
    expect(handElement).toHaveStyle('background-color: lightblue');
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
    expect(mockOnSelectionChange).toHaveBeenCalledWith([handToClick]);

    // Second click: deselect
    fireEvent.click(handElement);
    expect(handElement).toHaveStyle('background-color: white');
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(2);
    expect(mockOnSelectionChange).toHaveBeenCalledWith([]);
  });

  test('clicking multiple hands correctly updates selection and calls onSelectionChange', () => {
    const mockOnSelectionChange = jest.fn();
    render(<StrategyEditor onSelectionChange={mockOnSelectionChange} />);

    const hand1 = 'QJs';
    const hand2 = 'T9o';
    const hand3 = '22';

    const element1 = screen.getByText(hand1);
    const element2 = screen.getByText(hand2);
    const element3 = screen.getByText(hand3);

    // Click hand1
    fireEvent.click(element1);
    expect(mockOnSelectionChange).toHaveBeenCalledWith([hand1]);
    // Check that selectedHands are passed correctly, order might vary due to Set conversion
    expect(mockOnSelectionChange.mock.calls[0][0]).toEqual(expect.arrayContaining([hand1]));


    // Click hand2
    fireEvent.click(element2);
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(2);
    // Order might vary, so check for array containing both
    expect(mockOnSelectionChange.mock.calls[1][0]).toEqual(expect.arrayContaining([hand1, hand2]));
    expect(mockOnSelectionChange.mock.calls[1][0].length).toBe(2);


    // Click hand3
    fireEvent.click(element3);
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(3);
    expect(mockOnSelectionChange.mock.calls[2][0]).toEqual(expect.arrayContaining([hand1, hand2, hand3]));
    expect(mockOnSelectionChange.mock.calls[2][0].length).toBe(3);

    // Deselect hand1
    fireEvent.click(element1);
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(4);
    expect(mockOnSelectionChange.mock.calls[3][0]).toEqual(expect.arrayContaining([hand2, hand3]));
    expect(mockOnSelectionChange.mock.calls[3][0].length).toBe(2);
  });

  test('updates selection when initialHands prop changes', () => {
    const initialHands1 = ['AA', 'KKs'];
    const { rerender } = render(<StrategyEditor initialHands={initialHands1} />);
    
    expect(screen.getByText('AA')).toHaveStyle('background-color: lightblue');
    expect(screen.getByText('KKs')).toHaveStyle('background-color: lightblue');
    expect(screen.getByText('QQo')).toHaveStyle('background-color: white');

    const initialHands2 = ['QQo', 'JJs'];
    rerender(<StrategyEditor initialHands={initialHands2} />);

    expect(screen.getByText('QQo')).toHaveStyle('background-color: lightblue');
    expect(screen.getByText('JJs')).toHaveStyle('background-color: lightblue');
    // Check that previously selected hands are now unselected if not in new prop
    expect(screen.getByText('AA')).toHaveStyle('background-color: white');
    expect(screen.getByText('KKs')).toHaveStyle('background-color: white');
  });
});
