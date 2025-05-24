import React from 'react';
import { render, screen, within } from '@testing-library/react';
import PokerGameTab from '../PokerGameTab';
import '@testing-library/jest-dom';

// Mock child components that are not directly relevant to the pause UI logic
jest.mock('../HandDealer', () => () => <div data-testid="hand-dealer">HandDealer Content</div>);
jest.mock('../DecisionButtons', () => () => <div data-testid="decision-buttons">DecisionButtons Content</div>);
jest.mock('../GameOver', () => () => <div data-testid="game-over">GameOver Content</div>);
jest.mock('../IncorrectAnswers', () => () => <div data-testid="incorrect-answers">IncorrectAnswers Content</div>);

// Mock MUI icons by returning a simple div with a data-testid
jest.mock('@mui/icons-material/Pause', () => () => <div data-testid="PauseIcon">PauseIcon</div>);
jest.mock('@mui/icons-material/PlayArrow', () => () => <div data-testid="PlayArrowIcon">PlayArrowIcon</div>);
jest.mock('@mui/icons-material/PauseCircleOutline', () => () => <div data-testid="PauseCircleOutlineIcon">PauseCircleOutlineIcon</div>);


describe('PokerGameTab', () => {
  const defaultProps = {
    gameOver: false,
    score: 100,
    highScore: 200,
    hand: ['Ah', 'Kh'],
    situation: 'RFI - MP - Hero', // Example format "Situation - Hero - Villain"
    position: 'Raise First In - Middle Position - N/A', // Updated to match the new split logic
    availableActions: ['Raise', 'Fold'],
    makeDecision: jest.fn(),
    lives: 3,
    streak: 2,
    restartGame: jest.fn(),
    wrongChoices: [],
    hintedAction: null,
    timeLeft: 30,
    hints: 2,
    handleHintClick: jest.fn(),
    isHintButtonDisabled: false,
    isPaused: false,
    togglePausePlay: jest.fn(),
  };

  // Helper to render with specific props
  const renderPokerGameTab = (props) => {
    return render(<PokerGameTab {...defaultProps} {...props} />);
  };

  describe('Pause/Play Button Icon', () => {
    test('shows PauseIcon when not paused', () => {
      renderPokerGameTab({ isPaused: false });
      const pauseButton = screen.getByLabelText('pause');
      expect(within(pauseButton).getByTestId('PauseIcon')).toBeInTheDocument();
      expect(within(pauseButton).queryByTestId('PlayArrowIcon')).not.toBeInTheDocument();
    });

    test('shows PlayArrowIcon when paused', () => {
      renderPokerGameTab({ isPaused: true });
      const playButton = screen.getByLabelText('play');
      expect(within(playButton).getByTestId('PlayArrowIcon')).toBeInTheDocument();
      expect(within(playButton).queryByTestId('PauseIcon')).not.toBeInTheDocument();
    });
  });

  describe('HandDealer Obscuring', () => {
    test('shows HandDealer content when not paused', () => {
      renderPokerGameTab({ isPaused: false });
      expect(screen.getByTestId('hand-dealer')).toBeVisible();
      expect(screen.queryByText('Game Paused')).not.toBeInTheDocument();
    });

    test('shows "Game Paused" placeholder and hides HandDealer when paused', () => {
      renderPokerGameTab({ isPaused: true });
      expect(screen.queryByTestId('hand-dealer')).not.toBeInTheDocument();
      expect(screen.getByText('Game Paused')).toBeVisible();
      expect(screen.getByTestId('PauseCircleOutlineIcon')).toBeVisible(); // Check for icon in placeholder
    });
  });

  describe('Situation/Position Obscuring', () => {
    test('shows situation/position content when not paused', () => {
      renderPokerGameTab({ isPaused: false });
      // Check for parts of the situation/position string
      expect(screen.getByText(/Situation:/)).toBeVisible();
      expect(screen.getByText(/Villain:/)).toBeVisible();
      expect(screen.getByText(/Hero:/)).toBeVisible();
      expect(screen.queryByText('Situation Hidden')).not.toBeInTheDocument();
    });

    test('shows "Situation Hidden" placeholder and hides situation/position when paused', () => {
      renderPokerGameTab({ isPaused: true });
      expect(screen.queryByText(/Situation:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Villain:/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Hero:/)).not.toBeInTheDocument();
      expect(screen.getByText('Situation Hidden')).toBeVisible();
      // Check for icon in placeholder (assuming the same icon is used, or adjust if different)
      expect(screen.getAllByTestId('PauseCircleOutlineIcon').length).toBeGreaterThan(0); 
    });
  });
  
  test('renders score, high score, and other elements correctly when not paused', () => {
    renderPokerGameTab({ isPaused: false });
    expect(screen.getByText(`Score: ${defaultProps.score}`)).toBeInTheDocument();
    expect(screen.getByText(`High Score: ${defaultProps.highScore}`)).toBeInTheDocument();
    expect(screen.getByTestId('decision-buttons')).toBeInTheDocument();
    expect(screen.getByText(`Streak: ${defaultProps.streak}`)).toBeInTheDocument();
  });

  test('renders score, high score, and other elements correctly even when paused (as they are not obscured)', () => {
    renderPokerGameTab({ isPaused: true });
    expect(screen.getByText(`Score: ${defaultProps.score}`)).toBeInTheDocument();
    expect(screen.getByText(`High Score: ${defaultProps.highScore}`)).toBeInTheDocument();
    expect(screen.getByTestId('decision-buttons')).toBeInTheDocument(); // Decision buttons remain
    expect(screen.getByText(`Streak: ${defaultProps.streak}`)).toBeInTheDocument();
  });

   test('renders GameOver screen when gameOver is true', () => {
    renderPokerGameTab({ gameOver: true });
    expect(screen.getByTestId('game-over')).toBeInTheDocument();
    expect(screen.getByTestId('incorrect-answers')).toBeInTheDocument();
    // Ensure game elements are not shown
    expect(screen.queryByTestId('hand-dealer')).not.toBeInTheDocument();
    expect(screen.queryByText(/What's your decision?/)).not.toBeInTheDocument();
  });

});
