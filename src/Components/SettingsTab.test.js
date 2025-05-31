import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Already in setupTests.js, but good for clarity
import SettingsTab from './SettingsTab';

// Default mock props setup
const mockProps = {
  username: '',
  soundEnabled: true,
  soundVolume: 0.5,
  difficulty: 'Medium',
  shortcutConfig: {
    hintKey: 'h',
    pausePlayKey: 'p',
    settingsKey: 's',
    rulesKey: 'r'
  },
  currentStrategy: { /* some default strategy structure if needed */ },
  showStrategyModal: false,

  // Mock functions
  handleUsernameChange: jest.fn(),
  handleSoundToggle: jest.fn(),
  handleVolumeChange: jest.fn(),
  handleDifficultyChange: jest.fn(),
  setShortcutConfig: jest.fn(),
  handleSaveSettings: jest.fn(),
  handleOpenStrategyModal: jest.fn(),
  handleCloseStrategyModal: jest.fn(), // Though not directly triggered by SettingsTab UI, good to have if modal was part of it
  handleSaveStrategy: jest.fn(),     // Same as above
  handleResetStrategy: jest.fn(),
  setIsInputFocused: jest.fn(),
  // onPanelClose: jest.fn(), // This was removed from SettingsTab props, handleSaveSettings handles closure
};

describe('SettingsTab Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders all accordion sections initially', () => {
    render(<SettingsTab {...mockProps} />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Appearance/Sound')).toBeInTheDocument();
    expect(screen.getByText('Gameplay')).toBeInTheDocument();
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Strategy')).toBeInTheDocument();
  });

  // Helper function to open an accordion
  const openAccordion = (name) => {
    fireEvent.click(screen.getByText(name));
  };

  describe('General Section', () => {
    test('updates username field and calls handler', () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('General');

      const usernameInput = screen.getByLabelText(/Username/i);
      fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
      // expect(usernameInput.value).toBe('TestUser'); // The component itself doesn't hold state for username
      expect(mockProps.handleUsernameChange).toHaveBeenCalledTimes(1);
      // MUI TextField calls onChange with the event, not just the value.
      // We can check if it was called, or be more specific if needed.
      expect(mockProps.handleUsernameChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'TestUser' })
      }));
    });

    test('calls setIsInputFocused on username focus and blur', () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('General');
      const usernameInput = screen.getByLabelText(/Username/i);

      fireEvent.focus(usernameInput);
      expect(mockProps.setIsInputFocused).toHaveBeenCalledWith(true);

      fireEvent.blur(usernameInput);
      expect(mockProps.setIsInputFocused).toHaveBeenCalledWith(false);
    });
  });

  describe('Appearance/Sound Section', () => {
    test('toggles sound effects and calls handler', () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('Appearance/Sound');

      // MUI Switch uses a role="switch" input
      const soundSwitch = screen.getByRole('checkbox', { name: /Sound Effects/i });
      fireEvent.click(soundSwitch);
      expect(mockProps.handleSoundToggle).toHaveBeenCalledTimes(1);
    });

    test('changes sound volume and calls handler', () => {
      render(<SettingsTab {...mockProps} soundEnabled={true} />); // Ensure slider is not disabled
      openAccordion('Appearance/Sound');

      // MUI Slider is complex. We target the hidden input if possible,
      // or simulate a mouse event more directly if needed.
      // For now, let's assume there's an input we can change.
      // This might need adjustment based on MUI's internal structure.
      const slider = screen.getByRole('slider', { name: /Sound Volume/i });
      // Directly changing the value of the slider.
      // Note: fireEvent.change might not work as expected for all custom slider components.
      // User-event library often handles these better.
      // We are simulating the change event with the new value.
      fireEvent.change(slider, { target: { value: 0.75 } });
      expect(mockProps.handleVolumeChange).toHaveBeenCalledTimes(1);
      // The second argument to handleVolumeChange is the value
      expect(mockProps.handleVolumeChange).toHaveBeenCalledWith(expect.anything(), 0.75);
    });
  });

  describe('Gameplay Section', () => {
    test('changes difficulty and calls handler', async () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('Gameplay');

      const difficultySelect = screen.getByRole('button', { name: /Difficulty/i }); // MUI Select role might be button
      fireEvent.mouseDown(difficultySelect); // Open the dropdown

      // Wait for MenuItems to be in the document
      await waitFor(() => screen.getByText('Hard')); // Example value
      fireEvent.click(screen.getByText('Hard'));

      expect(mockProps.handleDifficultyChange).toHaveBeenCalledTimes(1);
      expect(mockProps.handleDifficultyChange).toHaveBeenCalledWith('Hard');
    });
  });

  describe('Keyboard Shortcuts Section', () => {
    const testCases = [
      { label: /Hint Key/i, actionName: 'hintKey' },
      { label: /Pause\/Play Key/i, actionName: 'pausePlayKey' },
      { label: /Settings Key/i, actionName: 'settingsKey' },
      { label: /Rules Key/i, actionName: 'rulesKey' },
    ];

    testCases.forEach(({ label, actionName }) => {
      test(`updates ${actionName} field, calls setShortcutConfig and setIsInputFocused`, () => {
        render(<SettingsTab {...mockProps} />);
        openAccordion('Keyboard Shortcuts');

        const inputField = screen.getByLabelText(label);

        fireEvent.focus(inputField);
        expect(mockProps.setIsInputFocused).toHaveBeenCalledWith(true);

        fireEvent.change(inputField, { target: { value: 'x' } });
        // Check if setShortcutConfig was called with a function
        expect(mockProps.setShortcutConfig).toHaveBeenCalledTimes(1);
        expect(mockProps.setShortcutConfig).toHaveBeenCalledWith(expect.any(Function));

        // To check the outcome of the function passed to setShortcutConfig:
        const lastCall = mockProps.setShortcutConfig.mock.calls[0][0];
        const newState = lastCall(mockProps.shortcutConfig);
        expect(newState[actionName]).toBe('x');

        fireEvent.blur(inputField);
        expect(mockProps.setIsInputFocused).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Strategy Section', () => {
    test('calls handleOpenStrategyModal when "Customize Preflop Strategy" is clicked', () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('Strategy');

      const customizeButton = screen.getByRole('button', { name: /Customize Preflop Strategy/i });
      fireEvent.click(customizeButton);
      expect(mockProps.handleOpenStrategyModal).toHaveBeenCalledTimes(1);
    });

    test('calls handleResetStrategy when "Reset to Default Strategy" is clicked', () => {
      render(<SettingsTab {...mockProps} />);
      openAccordion('Strategy');

      const resetButton = screen.getByRole('button', { name: /Reset to Default Strategy/i });
      fireEvent.click(resetButton);
      expect(mockProps.handleResetStrategy).toHaveBeenCalledTimes(1);
    });
  });

  test('calls handleSaveSettings when "Save All Settings" button is clicked', () => {
    render(<SettingsTab {...mockProps} />);
    // The button is outside accordions, so no need to open one
    const saveButton = screen.getByRole('button', { name: /Save All Settings/i });
    fireEvent.click(saveButton);
    expect(mockProps.handleSaveSettings).toHaveBeenCalledTimes(1);
  });

});
