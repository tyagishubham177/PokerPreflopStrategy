import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsTab from './SettingsTab';
import { initialPokerStrategy } from '../../Constants/InitialStrategy';
import { POSITION_LABELS } from '../../Constants/GameLabels'; 

let mockModalOnSave;
let mockModalOnClose;
jest.mock('./StrategyCustomizationModal', () => {
  return jest.fn(({ open, onClose, initialStrategy, gameLabels, onSave }) => {
    mockModalOnSave = onSave; 
    mockModalOnClose = onClose; 
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
    localStorageMock.clear(); 
    jest.clearAllMocks(); 
    StrategyCustomizationModal.mockClear(); 
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
    
    expect(modalInitialStrategy).toEqual(reconstructToNested(customStrategyFlat));
  });

  test('handleSaveStrategy saves the strategy to localStorage and updates currentStrategy', () => {
    render(<SettingsTab />);
    
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    expect(screen.getByTestId('mock-strategy-customization-modal')).toBeInTheDocument();

    const newStrategyFromModal = { UTG: ['AA', 'KK'], MP: ['KK'], HJ:[], CO:[], BTN:[], SB:[] }; 
     act(() => {
      mockModalOnSave(newStrategyFromModal); 
    });

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      CUSTOM_STRATEGY_LS_KEY,
      JSON.stringify(newStrategyFromModal) 
    );

    expect(screen.queryByTestId('mock-strategy-customization-modal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalInitialStrategy).toEqual(reconstructToNested(newStrategyFromModal));
  });

  test('"Reset to Default Strategy" button clears localStorage and resets strategy in state', () => {
    const customStrategyFlat = { UTG: ['AKo'], SB: ['AJo'] };
    localStorageMock.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(customStrategyFlat)); 
    
    render(<SettingsTab />);
    
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    let modalStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalStrategy).toEqual(reconstructToNested(customStrategyFlat));
    act(() => {
        mockModalOnClose(); 
    });
    expect(screen.queryByTestId('mock-strategy-customization-modal')).not.toBeInTheDocument();


    fireEvent.click(screen.getByRole('button', { name: /Reset to Default Strategy/i }));
    
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(CUSTOM_STRATEGY_LS_KEY);

    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    modalStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalStrategy).toEqual(initialPokerStrategy); 
  });

  test('handles corrupted JSON in localStorage gracefully by falling back to default', () => {
    localStorageMock.getItem.mockReturnValueOnce("this is not json");
    console.error = jest.fn(); 

    render(<SettingsTab />);
    fireEvent.click(screen.getByRole('button', { name: /Customize Initial Strategy/i }));
    
    expect(StrategyCustomizationModal).toHaveBeenCalledTimes(1);
    const modalInitialStrategy = JSON.parse(screen.getByTestId('modal-initial-strategy').textContent);
    expect(modalInitialStrategy).toEqual(initialPokerStrategy);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Failed to load custom strategy from localStorage:"), expect.any(Error));
  });
});
