import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsTab from './SettingsTab';
import { initialPokerStrategy } from '../../Constants/InitialStrategy';
import { POSITION_LABELS } from '../../Constants/GameLabels'; // Used by SettingsTab

// Mock StrategyCustomizationModal
// We need to be able to simulate its onSave and onClose calls
let mockModalOnSave;
let mockModalOnClose;
jest.mock('./StrategyCustomizationModal', () => {
  return jest.fn(({ open, onClose, initialStrategy, gameLabels, onSave }) => {
    mockModalOnSave = onSave; // Capture the onSave prop
    mockModalOnClose = onClose; // Capture the onClose prop
    if (!open) return null;
    return (
      <div data-testid="mock-strategy-customization-modal">
        <span data-testid="modal-initial-strategy">{JSON.stringify(initialStrategy)}</span>
        <span data-testid="modal-game-labels">{JSON.stringify(gameLabels)}</span>
        <button data-testid="modal-simulate-save" onClick={() => onSave({ UTG: ['AA'], MP: ['KK'] })}>Simulate Save</button>
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
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';

// Helper to reconstruct strategy to nested format for comparison
// This mimics the reconstruction logic in SettingsTab's currentStrategy state initialization
// and in handleSaveStrategy when updating currentStrategy.
const reconstructToNested = (flatStrategy) => {
  const nested = { RFI: {} };
  for (const key in flatStrategy) {
    if (key === "SB") {
        nested.RFI[key] = { "Raise for Value": flatStrategy[key], "Raise as bluff": [] };
    } else {
        nested.RFI[key] = { "Raise": flatStrategy[key] };
    }
  }
  return nested;
};


describe('SettingsTab localStorage Logic', () => {
  beforeEach(() => {
    localStorageMock.clear(); // Clear store before each test
    jest.clearAllMocks(); // Clear all function mocks
    StrategyCustomizationModal.mockClear(); // Clear mock component specific counts/calls
  });

  test('loads default strategy (initialPokerStrategy) if localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);
    render(<SettingsTab />);
    
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    
    expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalInitialStrategy).toEqual(initialPokerStrategy);
  });

  test('loads and parses saved strategy from localStorage', () => {
    const customStrategyFlat = { 
      UTG: ['AA', 'KK'], 
      MP: ['QQ'], 
      HJ: ['JJ'], 
      CO: ['TT'], 
      BTN: ['99'], 
      SB: ['88', '77s'] 
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(customStrategyFlat));
    
    render(<SettingsTab />);
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    
    expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    
    // The strategy in SettingsTab's state (`currentStrategy`) and passed to the modal
    // should be the reconstructed nested version of what's in localStorage.
    expect(modalInitialStrategy).toEqual(reconstructToNested(customStrategyFlat));
  });

  test('handleSaveStrategy saves the strategy to localStorage and updates currentStrategy', () => {
    render(<SettingsTab />);
    
    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    expect(screen.getByTestId('mock-strategy-customization-modal')).toBeInTheDocument();

    // Simulate the modal calling onSave (which is handleSaveStrategy in SettingsTab)
    // The mocked modal has a button that calls onSave with { UTG: ['AA'], MP: ['KK'] }
    const newStrategyFromModal = { UTG: ['AA', 'KK'], MP: ['KK'], HJ:[], CO:[], BTN:[], SB:[] }; // More complete
     act(() => {
      mockModalOnSave(newStrategyFromModal); // Directly call the captured onSave prop
    });

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      CUSTOM_STRATEGY_LS_KEY,
      JSON.stringify(newStrategyFromModal) // This is the flat format saved
    );

    // Modal should close after save
    expect(screen.queryByTestId('mock-strategy-customization-modal')).not.toBeInTheDocument();

    // Re-open the modal to check if currentStrategy was updated
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalInitialStrategy).toEqual(reconstructToNested(newStrategyFromModal));
  });

  test('"Reset to Default Strategy" button clears localStorage and resets strategy in state', () => {
    const customStrategyFlat = { UTG: ['AKo'], SB: ['AJo'] };
    localStorageMock.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(customStrategyFlat)); // Pre-populate
    
    render(<SettingsTab />);
    
    // Verify it's initially loaded (optional, but good for confidence)
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    let modalStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalStrategy).toEqual(reconstructToNested(customStrategyFlat));
    act(() => {
        mockModalOnClose(); // Close modal
    });
    expect(screen.queryByTestId('mock-strategy-customization-modal')).not.toBeInTheDocument();


    // Click the reset button
    fireEvent.click(screen.getByRole('button', { name: /Reset to Default Strategy/i }));
    
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(CUSTOM_STRATEGY_LS_KEY);

    // Re-open the modal
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    modalStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalStrategy).toEqual(initialPokerStrategy); // Should be default now
  });

  test('handles corrupted JSON in localStorage gracefully by falling back to default', () => {
    localStorageMock.getItem.mockReturnValueOnce("this is not json");
    console.error = jest.fn(); // Mock console.error to suppress expected error message in test output

    render(<SettingsTab />);
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    
    expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalInitialStrategy).toEqual(initialPokerStrategy);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Failed to load custom strategy from localStorage:"), expect.any(Error));
  });
});
