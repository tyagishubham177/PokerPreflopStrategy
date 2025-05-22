import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StrategyCustomizationModal from './StrategyCustomizationModal';
// Import the actual constants
import { initialPokerStrategy as actualInitialStrategy } from '../Constants/InitialStrategy';
import { SITUATION_LABELS as actualSituationLabels } from '../Constants/GameLabels';
import { POSITION_LABELS as actualPositionLabels } from '../Constants/GameLabels';

// Mock StrategyEditor
jest.mock('./StrategyEditor', () => {
  return jest.fn(({ initialHands, onSelectionChange }) => (
    <div data-testid="mock-strategy-editor">
      <button
        data-testid="mock-editor-add-hand"
        onClick={() => onSelectionChange([...initialHands, 'NEW_HAND_FOR_TEST'])}
      >
        Add Hand
      </button>
      <span data-testid="mock-editor-hands">{JSON.stringify(initialHands)}</span>
    </div>
  ));
});

// Use a deep copy of the actual strategy for tests to avoid modifications across tests
const mockInitialStrategy = JSON.parse(JSON.stringify(actualInitialStrategy));
const mockSituationLabels = actualSituationLabels;
const mockPositionLabels = actualPositionLabels;


describe('StrategyCustomizationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the mock implementation details of StrategyEditor if needed, though jest.clearAllMocks() should handle it.
    // StrategyEditor.mockClear(); 
  });

  const renderModal = (props = {}) => {
    return render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        // Pass the actual initialStrategy from constants, as the component imports it directly too for initialization.
        // The prop initialStrategy in the component is named initialStrategyFromProp, which is not used.
        // The component now internally uses the imported initialPokerStrategy.
        // For consistency in testing what the component *uses*, we can pass it here,
        // but the key is that the component initializes its state from the *imported* initialPokerStrategy.
        initialStrategy={mockInitialStrategy} // This prop is initialStrategyFromProp in the component
        {...props}
      />
    );
  };

  test('renders essential UI elements: title, three dropdowns, StrategyEditor, and buttons', () => {
    renderModal();

    expect(screen.getByText('Customize Initial Strategy')).toBeInTheDocument();

    // Check for dropdowns by their labels
    expect(screen.getByLabelText('Situation')).toBeInTheDocument();
    expect(screen.getByLabelText('Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Decision')).toBeInTheDocument();

    // Check for StrategyEditor mock
    expect(screen.getByTestId('mock-strategy-editor')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  test('Situation dropdown is populated and defaults correctly', async () => {
    renderModal();
    const situationSelect = screen.getByLabelText('Situation');
    fireEvent.mouseDown(situationSelect); // Open the dropdown

    const situationKeys = Object.keys(mockInitialStrategy);
    const firstSituationKey = situationKeys[0];

    await waitFor(() => {
      for (const sitKey of situationKeys) {
        const label = mockSituationLabels[sitKey] || sitKey;
        expect(screen.getByRole('option', { name: label })).toBeInTheDocument();
      }
    });
    // Check default selection display value
    expect(screen.getByRole('button', { name: mockSituationLabels[firstSituationKey] || firstSituationKey })).toBeInTheDocument();
  });

  test('Position dropdown is populated based on selected Situation and defaults correctly', async () => {
    renderModal();
    const situationKeys = Object.keys(mockInitialStrategy);
    const firstSituationKey = situationKeys[0];

    // Default situation is already selected, check position dropdown
    const positionSelect = screen.getByLabelText('Position');
    fireEvent.mouseDown(positionSelect); // Open the dropdown

    const positionKeys = Object.keys(mockInitialStrategy[firstSituationKey]);
    const firstPositionKey = positionKeys[0];
    
    await waitFor(() => {
      for (const posKey of positionKeys) {
        const labelObj = mockPositionLabels[posKey];
        const expectedLabel = (labelObj && `${labelObj.hero} vs ${labelObj.villain}`) || posKey;
        expect(screen.getByRole('option', { name: expectedLabel })).toBeInTheDocument();
      }
    });
     // Check default selection display value
    const firstPosLabelObj = mockPositionLabels[firstPositionKey];
    const firstPosExpectedLabel = (firstPosLabelObj && `${firstPosLabelObj.hero} vs ${firstPosLabelObj.villain}`) || firstPositionKey;
    expect(screen.getByRole('button', { name: firstPosExpectedLabel })).toBeInTheDocument();
  });

  test('Decision dropdown is populated based on selected Position and defaults correctly', async () => {
    renderModal();
    const situationKeys = Object.keys(mockInitialStrategy);
    const firstSituationKey = situationKeys[0];
    const positionKeys = Object.keys(mockInitialStrategy[firstSituationKey]);
    const firstPositionKey = positionKeys[0];

    // Default situation and position are selected, check decision dropdown
    const decisionSelect = screen.getByLabelText('Decision');
    fireEvent.mouseDown(decisionSelect); // Open the dropdown

    const decisionKeys = Object.keys(mockInitialStrategy[firstSituationKey][firstPositionKey]);
    const firstDecisionKey = decisionKeys[0];

    await waitFor(() => {
      for (const decKey of decisionKeys) {
        expect(screen.getByRole('option', { name: decKey })).toBeInTheDocument();
      }
    });
    // Check default selection display value
    expect(screen.getByRole('button', { name: firstDecisionKey })).toBeInTheDocument();
  });

  test('StrategyEditor receives correct initialHands based on default selections', () => {
    renderModal();
    const firstSituationKey = Object.keys(mockInitialStrategy)[0];
    const firstPositionKey = Object.keys(mockInitialStrategy[firstSituationKey])[0];
    const firstDecisionKey = Object.keys(mockInitialStrategy[firstSituationKey][firstPositionKey])[0];

    const expectedHands = mockInitialStrategy[firstSituationKey][firstPositionKey][firstDecisionKey];
    
    const editorHandsSpan = screen.getByTestId('mock-editor-hands');
    expect(JSON.parse(editorHandsSpan.textContent)).toEqual(expectedHands);
  });

  test('Changing Situation updates Position, Decision, and StrategyEditor hands', async () => {
    renderModal();
    
    const situationKeys = Object.keys(mockInitialStrategy);
    // Ensure there are at least two situations to test changing
    if (situationKeys.length < 2) {
        console.warn("Skipping Situation change test: Not enough situations in mockInitialStrategy.");
        return;
    }
    const secondSituationKey = situationKeys[1];
    const secondSituationLabel = mockSituationLabels[secondSituationKey] || secondSituationKey;

    fireEvent.mouseDown(screen.getByLabelText('Situation'));
    fireEvent.click(screen.getByRole('option', { name: secondSituationLabel }));

    await waitFor(() => {
      // Check if Position dropdown updated
      const newPositionKeys = Object.keys(mockInitialStrategy[secondSituationKey]);
      const firstNewPositionKey = newPositionKeys[0];
      const firstNewPositionLabelObj = mockPositionLabels[firstNewPositionKey];
      const firstNewPositionExpectedLabel = (firstNewPositionLabelObj && `${firstNewPositionLabelObj.hero} vs ${firstNewPositionLabelObj.villain}`) || firstNewPositionKey;
      expect(screen.getByRole('button', { name: firstNewPositionExpectedLabel })).toBeInTheDocument();

      // Check if Decision dropdown updated
      const newDecisionKeys = Object.keys(mockInitialStrategy[secondSituationKey][firstNewPositionKey]);
      const firstNewDecisionKey = newDecisionKeys[0];
      expect(screen.getByRole('button', { name: firstNewDecisionKey })).toBeInTheDocument();
      
      // Check if StrategyEditor hands updated
      const expectedHands = mockInitialStrategy[secondSituationKey][firstNewPositionKey][firstNewDecisionKey];
      const editorHandsSpan = screen.getByTestId('mock-editor-hands');
      expect(JSON.parse(editorHandsSpan.textContent)).toEqual(expectedHands);
    });
  });
  
  test('StrategyEditor interaction updates modifiedStrategies, and Save passes them', async () => {
    renderModal();
    const firstSituationKey = Object.keys(mockInitialStrategy)[0];
    const firstPositionKey = Object.keys(mockInitialStrategy[firstSituationKey])[0];
    const firstDecisionKey = Object.keys(mockInitialStrategy[firstSituationKey][firstPositionKey])[0];
    const initialHandsForSelection = mockInitialStrategy[firstSituationKey][firstPositionKey][firstDecisionKey];

    // Click the "Add Hand" button in the mock editor
    fireEvent.click(screen.getByTestId('mock-editor-add-hand'));
    
    // Wait for state update reflected in editor (optional, good for sanity check)
    await waitFor(() => {
        const editorHandsSpan = screen.getByTestId('mock-editor-hands');
        expect(JSON.parse(editorHandsSpan.textContent)).toEqual([...initialHandsForSelection, 'NEW_HAND_FOR_TEST']);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    const savedStrategies = mockOnSave.mock.calls[0][0];

    // Verify the specific part of the strategy was updated
    expect(savedStrategies[firstSituationKey][firstPositionKey][firstDecisionKey]).toEqual([...initialHandsForSelection, 'NEW_HAND_FOR_TEST']);

    // Verify other parts of the strategy remain unchanged (deep equality check)
    // This requires a deep copy of the original strategy with the specific modification
    const expectedSavedStrategy = JSON.parse(JSON.stringify(mockInitialStrategy));
    expectedSavedStrategy[firstSituationKey][firstPositionKey][firstDecisionKey] = [...initialHandsForSelection, 'NEW_HAND_FOR_TEST'];
    expect(savedStrategies).toEqual(expectedSavedStrategy);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when "Cancel" button is clicked and onSave is not called', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
