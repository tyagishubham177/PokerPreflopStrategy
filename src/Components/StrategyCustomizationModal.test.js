import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import StrategyCustomizationModal from './StrategyCustomizationModal';
import { initialPokerStrategy } from '../../Constants/InitialStrategy'; // For default structure
import { POSITION_LABELS } from '../../Constants/GameLabels'; // For tab labels

// Mock StrategyEditor as specified
jest.mock('./StrategyEditor', () => {
  return jest.fn(({ initialHands, onSelectionChange }) => (
    <div data-testid="mock-strategy-editor">
      <button
        data-testid="mock-editor-add-hand"
        onClick={() => onSelectionChange([...initialHands, 'NEW HAND'])}
      >
        Add Hand
      </button>
      <span data-testid="mock-editor-hands">{JSON.stringify(initialHands)}</span>
    </div>
  ));
});


const POSITIONS_FOR_TEST = [ // From StrategyCustomizationModal internal
  { key: "UTG", labelKey: "UTG", strategyPath: "RFI.UTG", uiLabel: "UTG" },
  { key: "MP", labelKey: "UTG+1", strategyPath: "RFI.UTG+1", uiLabel: "MP" },
  { key: "HJ", labelKey: "HJ", strategyPath: "RFI.HJ", uiLabel: "HJ" },
  { key: "CO", labelKey: "CO", strategyPath: "RFI.CO", uiLabel: "CO" },
  { key: "BTN", labelKey: "BTN", strategyPath: "RFI.BTN", uiLabel: "BTN" },
  { key: "SB", labelKey: "SB", strategyPath: "RFI.SB", uiLabel: "SB" },
];

describe('StrategyCustomizationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const baseInitialStrategy = JSON.parse(JSON.stringify(initialPokerStrategy)); // Deep copy

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset StrategyEditor mock if it's stateful in some way or to clear call counts
    StrategyEditor.mockClear();
  });

  test('renders with title, tabs, and initial content when open', () => {
    render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        initialStrategy={baseInitialStrategy}
        gameLabels={POSITION_LABELS}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Customize Initial Strategy')).toBeInTheDocument();

    POSITIONS_FOR_TEST.forEach(pos => {
      const expectedLabel = POSITION_LABELS[pos.labelKey] || pos.uiLabel;
      expect(screen.getByRole('tab', { name: expectedLabel })).toBeInTheDocument();
    });

    // Check if the first tab's content (StrategyEditor) is rendered with correct initial hands
    const firstPositionKey = POSITIONS_FOR_TEST[0].key; // UTG
    const expectedInitialHandsUTG = baseInitialStrategy.RFI[firstPositionKey]?.Raise || [];
    
    const mockEditor = screen.getByTestId('mock-strategy-editor');
    const displayedHands = within(mockEditor).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHands)).toEqual(expectedInitialHandsUTG);
  });

  test('changing tabs updates the StrategyEditor with correct hands', () => {
    render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        initialStrategy={baseInitialStrategy}
        gameLabels={POSITION_LABELS}
        onSave={mockOnSave}
      />
    );

    // Test SB specifically due to its unique structure
    const sbPosition = POSITIONS_FOR_TEST.find(p => p.key === 'SB');
    const sbTabLabel = POSITION_LABELS[sbPosition.labelKey] || sbPosition.uiLabel;
    fireEvent.click(screen.getByRole('tab', { name: sbTabLabel }));

    const expectedSBHands = Array.from(new Set([
      ...(baseInitialStrategy.RFI.SB['Raise for Value'] || []),
      ...(baseInitialStrategy.RFI.SB['Raise as bluff'] || [])
    ]));
    
    // The mock editor should re-render or update. We get it again.
    const mockEditor = screen.getByTestId('mock-strategy-editor');
    const displayedHandsSB = within(mockEditor).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHandsSB)).toEqual(expectedSBHands);

    // Test another position, e.g., CO
    const coPosition = POSITIONS_FOR_TEST.find(p => p.key === 'CO');
    const coTabLabel = POSITION_LABELS[coPosition.labelKey] || coPosition.uiLabel;
    fireEvent.click(screen.getByRole('tab', { name: coTabLabel }));
    
    const expectedCOHands = baseInitialStrategy.RFI.CO?.Raise || [];
    const mockEditorCO = screen.getByTestId('mock-strategy-editor'); // Re-query if necessary
    const displayedHandsCO = within(mockEditorCO).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHandsCO)).toEqual(expectedCOHands);
  });

  test('calls onSave with modified strategies and then onClose when "Save" is clicked', () => {
    render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        initialStrategy={baseInitialStrategy}
        gameLabels={POSITION_LABELS}
        onSave={mockOnSave}
      />
    );

    // Simulate a change in the currently active tab (UTG by default)
    // The mock StrategyEditor has a button to simulate onSelectionChange
    const addHandButton = screen.getByTestId('mock-editor-add-hand');
    fireEvent.click(addHandButton); // Adds "NEW HAND"

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    const savedStrategies = mockOnSave.mock.calls[0][0];
    
    // Check UTG (first tab, where we added "NEW HAND")
    const utgInitialHands = baseInitialStrategy.RFI.UTG?.Raise || [];
    expect(savedStrategies.UTG).toEqual(expect.arrayContaining([...utgInitialHands, 'NEW HAND']));

    // Check other positions remain as they were initially (e.g. MP)
    const mpInitialHands = baseInitialStrategy.RFI.MP?.Raise || [];
    expect(savedStrategies.MP).toEqual(mpInitialHands);
    
    // Check SB strategy was correctly initialized and is part of save data
    const sbInitialHands = Array.from(new Set([
        ...(baseInitialStrategy.RFI.SB['Raise for Value'] || []),
        ...(baseInitialStrategy.RFI.SB['Raise as bluff'] || [])
      ]));
    expect(savedStrategies.SB).toEqual(sbInitialHands);


    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when "Cancel" button is clicked', () => {
    render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        initialStrategy={baseInitialStrategy}
        gameLabels={POSITION_LABELS}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnSave).not.toHaveBeenCalled();
  });
  
  test('initializes strategies correctly even if parts of initialStrategy are missing', () => {
    const incompleteStrategy = {
      RFI: {
        UTG: { Raise: ['AA', 'KK'] },
        // MP is missing
        SB: { "Raise for Value": ['QQ'] } // "Raise as bluff" is missing
      }
    };
    render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        initialStrategy={incompleteStrategy}
        gameLabels={POSITION_LABELS}
        onSave={mockOnSave}
      />
    );

    // Check UTG (present)
    let mockEditor = screen.getByTestId('mock-strategy-editor');
    let displayedHands = within(mockEditor).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHands)).toEqual(['AA', 'KK']);

    // Switch to MP (missing in initialStrategy)
    const mpPosition = POSITIONS_FOR_TEST.find(p => p.key === 'MP');
    const mpTabLabel = POSITION_LABELS[mpPosition.labelKey] || mpPosition.uiLabel;
    fireEvent.click(screen.getByRole('tab', { name: mpTabLabel }));
    
    mockEditor = screen.getByTestId('mock-strategy-editor');
    displayedHands = within(mockEditor).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHands)).toEqual([]); // Should default to empty array

    // Switch to SB (partially defined)
    const sbPosition = POSITIONS_FOR_TEST.find(p => p.key === 'SB');
    const sbTabLabel = POSITION_LABELS[sbPosition.labelKey] || sbPosition.uiLabel;
    fireEvent.click(screen.getByRole('tab', { name: sbTabLabel }));

    mockEditor = screen.getByTestId('mock-strategy-editor');
    displayedHands = within(mockEditor).getByTestId('mock-editor-hands').textContent;
    expect(JSON.parse(displayedHands)).toEqual(['QQ']); // Combines "Raise for Value" and missing "Raise as bluff"
  });

});
