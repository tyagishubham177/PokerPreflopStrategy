import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsTab from './SettingsTab';
import { initialPokerStrategy } from '../Constants/InitialStrategy'; // Corrected path

// Key for localStorage
const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';

// Mock StrategyCustomizationModal
let mockModalOnSave; // To capture the onSave prop
let mockModalOnClose; // To capture the onClose prop

jest.mock('./StrategyCustomizationModal', () => {
  return jest.fn(({ open, onClose, initialStrategy, onSave }) => {
    // Capture the onSave and onClose props to simulate modal actions
    mockModalOnSave = onSave;
    mockModalOnClose = onClose;

    if (!open) return null;
    return (
      <div data-testid="mock-strategy-customization-modal">
        {/* Pass initialStrategy content to a data attribute to check it in tests */}
        <span data-testid="modal-initial-strategy-prop">{JSON.stringify(initialStrategy)}</span>
        {/* Simulate a save action from the modal */}
        <button data-testid="modal-simulate-save" onClick={() => {
          // Simulate saving a modified strategy (e.g., add a hand to RFI.UTG.Raise)
          const modifiedStrategy = JSON.parse(JSON.stringify(initialStrategy)); // Deep copy
          if (modifiedStrategy.RFI && modifiedStrategy.RFI.UTG && modifiedStrategy.RFI.UTG.Raise) {
            modifiedStrategy.RFI.UTG.Raise.push('NEW_HAND_FROM_MODAL');
          } else { // Fallback if structure is not as expected, to ensure save has some effect
            modifiedStrategy.NEW_KEY_FROM_MODAL = ['AAs'];
          }
          onSave(modifiedStrategy);
        }}>
          Simulate Save
        </button>
        <button data-testid="modal-simulate-close" onClick={onClose}>Simulate Close</button>
      </div>
    );
  });
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
      // Also reset mock function call counts
      localStorageMock.getItem.mockClear();
      localStorageMock.setItem.mockClear();
      localStorageMock.removeItem.mockClear();
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('SettingsTab', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks(); // Clears all mocks, including StrategyCustomizationModal
    // Restore console.error mock if it was set in a previous test
    if (console.error.mockRestore) {
        console.error.mockRestore();
    }
  });

  describe('Strategy Loading from localStorage', () => {
    test('loads initialPokerStrategy if localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      render(<SettingsTab />);
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));

      expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
      const modalProps = StrategyCustomizationModal.mock.calls[0][0];
      expect(modalProps.initialStrategy).toEqual(initialPokerStrategy);
    });

    test('loads and parses a valid full strategy from localStorage', () => {
      const savedStrategy = JSON.parse(JSON.stringify(initialPokerStrategy)); // Deep copy
      savedStrategy.RFI.UTG.Raise = ['AA', 'KK', 'QQ']; // Modify it slightly
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(savedStrategy));
      
      render(<SettingsTab />);
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));

      expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
      const modalProps = StrategyCustomizationModal.mock.calls[0][0];
      expect(modalProps.initialStrategy).toEqual(savedStrategy);
    });

    test('loads initialPokerStrategy if localStorage contains invalid JSON', () => {
      localStorageMock.getItem.mockReturnValueOnce('{"invalidJson": "test",}');
      jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error for this test

      render(<SettingsTab />);
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
      
      expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
      const modalProps = StrategyCustomizationModal.mock.calls[0][0];
      expect(modalProps.initialStrategy).toEqual(initialPokerStrategy);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Failed to load custom strategy from localStorage:"),
        expect.any(SyntaxError) // Or Error, depending on what JSON.parse throws
      );
    });
  });

  describe('Strategy Saving to localStorage', () => {
    test('saves the full strategy to localStorage and updates state when modal saves', () => {
      render(<SettingsTab />);
      
      // Open the modal
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
      expect(screen.getByTestId('mock-strategy-customization-modal')).toBeInTheDocument();

      // Simulate the modal saving a strategy
      // The mockModalOnSave function is captured when StrategyCustomizationModal is rendered
      // It will be called with a strategy modified by the mock itself
      act(() => {
        // The mock save button in the modal calls onSave with a modified strategy
        fireEvent.click(screen.getByTestId('modal-simulate-save'));
      });
      
      const expectedSavedStrategy = JSON.parse(JSON.stringify(initialPokerStrategy));
      expectedSavedStrategy.RFI.UTG.Raise.push('NEW_HAND_FROM_MODAL');

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        CUSTOM_STRATEGY_LS_KEY,
        JSON.stringify(expectedSavedStrategy)
      );

      // Modal should close after save
      expect(screen.queryByTestId('mock-strategy-customization-modal')).not.toBeInTheDocument();

      // Re-open the modal to check if currentStrategy in SettingsTab was updated
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
      const modalProps = StrategyCustomizationModal.mock.calls[1][0]; // Second call to the modal
      expect(modalProps.initialStrategy).toEqual(expectedSavedStrategy);
    });
  });

  describe('Passing Props to StrategyCustomizationModal', () => {
    test('passes correct initialStrategy and no gameLabels prop to modal', () => {
      const customStrategy = JSON.parse(JSON.stringify(initialPokerStrategy));
      customStrategy.RFI.CO.Raise = ['AQs', 'AKs'];
      localStorageMock.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(customStrategy));

      render(<SettingsTab />);
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));

      expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
      const modalProps = StrategyCustomizationModal.mock.calls[0][0];
      
      // Check initialStrategy prop
      expect(modalProps.initialStrategy).toEqual(customStrategy);
      
      // Check that gameLabels prop is not passed (should be undefined)
      expect(modalProps.gameLabels).toBeUndefined();
    });
  });

  describe('Resetting Strategy', () => {
    test('"Reset to Default Strategy" button clears localStorage and resets strategy state', () => {
      const customStrategy = { RFI: { UTG: { Raise: ['AKo'] } } }; // Simplified for this test
      localStorageMock.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(customStrategy));
      
      render(<SettingsTab />);
      
      // Open modal to confirm custom strategy is loaded initially
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
      let modalProps = StrategyCustomizationModal.mock.calls[0][0];
      expect(modalProps.initialStrategy).toEqual(customStrategy);
      act(() => {
        fireEvent.click(screen.getByTestId('modal-simulate-close')); // Close the modal
      });

      // Click the reset button
      fireEvent.click(screen.getByRole('button', { name: /Reset to Default Strategy/i }));
      
      expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(CUSTOM_STRATEGY_LS_KEY);

      // Re-open the modal to check if strategy is reset to default
      fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
      modalProps = StrategyCustomizationModal.mock.calls[1][0]; // Second call to the modal
      expect(modalProps.initialStrategy).toEqual(initialPokerStrategy);
    });
  });
});
