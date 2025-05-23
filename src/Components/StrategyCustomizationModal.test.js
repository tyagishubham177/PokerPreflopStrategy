import React from 'react';
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StrategyCustomizationModal from './StrategyCustomizationModal';
import { initialPokerStrategy as actualInitialStrategy } from '../Constants/InitialStrategy';
import { SITUATION_LABELS as actualSituationLabels } from '../Constants/GameLabels';
import { POSITION_LABELS as actualPositionLabels } from '../Constants/GameLabels';

// Enhanced Mock StrategyEditor
let mockEditorOnSelectionChange;
const mockStrategyEditorInitialHands = [];

jest.mock('./StrategyEditor', () => {
  return jest.fn(({ initialHands, onSelectionChange }) => {
    mockEditorOnSelectionChange = onSelectionChange; // Capture onSelectionChange
    // Store initialHands to help with reverting changes if needed
    // This simple mock won't perfectly replicate, but good for testing flow
    React.useEffect(() => {
        mockStrategyEditorInitialHands.length = 0; // Clear array
        Array.prototype.push.apply(mockStrategyEditorInitialHands, initialHands);
    }, [initialHands]);

    return (
      <div data-testid="mock-strategy-editor">
        <button
          data-testid="mock-editor-add-hand"
          onClick={() => {
            if (mockEditorOnSelectionChange) {
              mockEditorOnSelectionChange([...initialHands, 'NEW_HAND_FOR_TEST']);
            }
          }}
        >
          Add Hand
        </button>
        <button
          data-testid="mock-editor-revert-hand" // Simulate reverting change
          onClick={() => {
            if (mockEditorOnSelectionChange) {
              // Simulate reverting to the hands received by the editor when it was last rendered
              // For a more robust test, this would be the original hands for the current selection
              // but this mock relies on what it received.
              mockEditorOnSelectionChange(mockStrategyEditorInitialHands);
            }
          }}
        >
          Revert Hand
        </button>
        <span data-testid="mock-editor-hands">{JSON.stringify(initialHands)}</span>
      </div>
    );
  });
});

const getMockInitialStrategy = () => JSON.parse(JSON.stringify(actualInitialStrategy));

describe('StrategyCustomizationModal', () => {
  let mockOnClose;
  let mockOnSave;
  let windowConfirmSpy;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnSave = jest.fn();
    // Spy on window.confirm and provide a mock implementation
    windowConfirmSpy = jest.spyOn(window, 'confirm');
    StrategyEditor.mockClear(); // Clear mock calls for StrategyEditor
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restores all mocks, including window.confirm
  });

  const renderModal = (props = {}) => {
    const initialStrategy = props.initialStrategy || getMockInitialStrategy();
    return render(
      <StrategyCustomizationModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        initialStrategy={initialStrategy}
        {...props}
      />
    );
  };

  describe('Layout Tests', () => {
    test('uses a Grid layout for dropdowns and StrategyEditor', () => {
      renderModal();
      // Check for a container that would likely be the Grid container for dropdowns
      const dropdownsContainer = screen.getByLabelText('Situation').closest('div[class*="MuiGrid-item"]');
      expect(dropdownsContainer).toBeInTheDocument();

      // Check for the StrategyEditor's container
      const editorContainer = screen.getByTestId('mock-strategy-editor').closest('div[class*="MuiGrid-item"]');
      expect(editorContainer).toBeInTheDocument();

      // Check if both are children of a common Grid container
      expect(dropdownsContainer.parentElement).toBe(editorContainer.parentElement);
      expect(dropdownsContainer.parentElement.classList.contains('MuiGrid-container')).toBe(true);
    });
  });

  describe('"Save" Button Disabled State', () => {
    test('is initially disabled', () => {
      renderModal();
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    });

    test('becomes enabled after a change in StrategyEditor', async () => {
      renderModal();
      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeDisabled();

      act(() => {
        fireEvent.click(screen.getByTestId('mock-editor-add-hand'));
      });
      
      await waitFor(() => expect(saveButton).toBeEnabled());
    });

    test('becomes disabled again if changes are reverted', async () => {
      renderModal();
      const saveButton = screen.getByRole('button', { name: 'Save' });
      
      // Make a change
      act(() => {
        fireEvent.click(screen.getByTestId('mock-editor-add-hand'));
      });
      await waitFor(() => expect(saveButton).toBeEnabled());

      // Revert the change using the new mock button
      act(() => {
        fireEvent.click(screen.getByTestId('mock-editor-revert-hand'));
      });
      await waitFor(() => expect(saveButton).toBeDisabled());
    });
  });

  describe('Confirmation on Close (Unsaved Changes)', () => {
    const simulateChange = () => {
      act(() => {
        fireEvent.click(screen.getByTestId('mock-editor-add-hand'));
      });
    };
    
    // Helper to get Dialog's onClose prop
    const getDialogOnClose = () => {
        // The Dialog is rendered directly by StrategyCustomizationModal.
        // We need to find the actual Dialog component in the DOM to inspect its props,
        // or rely on the mock structure if it captures it.
        // For this, we'll assume the Dialog's onClose is correctly wired to the internal logic.
        // The test will simulate backdrop/escape by directly calling the component's handler.
        // This requires finding the component instance or its props, which testing-library doesn't easily do.
        // Instead, we simulate the event that *triggers* the Dialog's onClose.
        // For backdrop click, we can simulate a click on the backdrop element if we can find it.
        // For escape key, we can fire a keydown event on the document.
        // Or, we can find the Dialog component (e.g., by role 'dialog') and call its onClose prop.
        // Let's try simulating the event on the Dialog itself.
        const dialogElement = screen.getByRole('dialog');
        return dialogElement; // This is not the prop, but the element.
                               // We'll rely on the Cancel button for these tests or simulate key press.
    };


    test('Case 1: Changes exist, user discards (via Cancel button)', async () => {
      renderModal();
      simulateChange();
      await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()); // Ensure change is registered

      windowConfirmSpy.mockReturnValue(true); // User clicks "OK"

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(windowConfirmSpy).toHaveBeenCalledTimes(1);
      expect(windowConfirmSpy).toHaveBeenCalledWith("You have unsaved changes. Are you sure you want to discard them?");
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    
    test('Case 1b: Changes exist, user discards (via Escape key)', async () => {
        renderModal();
        simulateChange();
        await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());
  
        windowConfirmSpy.mockReturnValue(true);
  
        // Simulate Escape key press on the dialog
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
  
        expect(windowConfirmSpy).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });

    test('Case 2: Changes exist, user does not discard (via Cancel button)', async () => {
      renderModal();
      simulateChange();
      await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());

      windowConfirmSpy.mockReturnValue(false); // User clicks "Cancel"

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(windowConfirmSpy).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    test('Case 3: No changes, close attempt (via Cancel button)', () => {
      renderModal();
      // Ensure Save is disabled (no changes)
      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(windowConfirmSpy).not.toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    
     test('Case 3b: No changes, close attempt (via Escape key)', () => {
        renderModal();
        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
  
        expect(windowConfirmSpy).not.toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
  });
  
  // Previous tests for basic rendering, dropdowns, and simple save functionality
  // These are still valuable and can be kept, potentially refactored for clarity if needed.
  // For brevity in this response, I'm focusing on the new/changed tests.
  // The existing tests for dropdown population and default StrategyEditor hands are assumed to be still relevant.
  // The "StrategyEditor interaction updates modifiedStrategies, and Save passes them" test should be reviewed
  // in light of the new save button disabled state.

  describe('Core Functionality (from previous tests, adapted)', () => {
    test('renders essential UI elements', () => {
        renderModal();
        expect(screen.getByText('Customize Initial Strategy')).toBeInTheDocument();
        expect(screen.getByLabelText('Situation')).toBeInTheDocument();
        expect(screen.getByLabelText('Position')).toBeInTheDocument();
        expect(screen.getByLabelText('Decision')).toBeInTheDocument();
        expect(screen.getByTestId('mock-strategy-editor')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      });

    test('StrategyEditor receives correct initialHands and Save works after change', async () => {
        renderModal({ initialStrategy: getMockInitialStrategy() }); // Use a fresh copy
        const firstSituationKey = Object.keys(actualInitialStrategy)[0];
        const firstPositionKey = Object.keys(actualInitialStrategy[firstSituationKey])[0];
        const firstDecisionKey = Object.keys(actualInitialStrategy[firstSituationKey][firstPositionKey])[0];
        const expectedInitialHands = actualInitialStrategy[firstSituationKey][firstPositionKey][firstDecisionKey];
    
        // Check initial hands in editor
        const editorHandsSpan = screen.getByTestId('mock-editor-hands');
        expect(JSON.parse(editorHandsSpan.textContent)).toEqual(expectedInitialHands);
    
        // Simulate change
        act(() => {
          fireEvent.click(screen.getByTestId('mock-editor-add-hand'));
        });
        
        // Wait for Save button to be enabled
        const saveButton = screen.getByRole('button', { name: 'Save' });
        await waitFor(() => expect(saveButton).toBeEnabled());
    
        // Click Save
        act(() => {
            fireEvent.click(saveButton);
        });
    
        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedStrategies = mockOnSave.mock.calls[0][0];
        const expectedSavedStrategy = getMockInitialStrategy(); // Get a fresh copy
        expectedSavedStrategy[firstSituationKey][firstPositionKey][firstDecisionKey].push('NEW_HAND_FOR_TEST');
        expect(savedStrategies).toEqual(expectedSavedStrategy);
        
        // Modal should close after save
        expect(mockOnClose).toHaveBeenCalledTimes(1); 
      });
  });

});
