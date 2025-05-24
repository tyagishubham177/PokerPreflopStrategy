import { renderHook, act } from '@testing-library/react-hooks';
import usePokerGame from '../UsePokerGame';
import { DIFFICULTY_LEVELS } from '../../Constants/GameConstants';

// Mock dependencies
jest.mock('../useGameState');
jest.mock('../useGameLogic');

// Default mock implementations
const mockDecrementLives = jest.fn();
const mockSetGameOver = jest.fn();
const mockSetStreak = jest.fn();
const mockSetLastAnswerCorrectness = jest.fn();
const mockSetWrongChoices = jest.fn();
const mockUpdateHighScore = jest.fn();
const mockSetScore = jest.fn();
const mockResetLives = jest.fn();
const mockResetGameScoreAndStats = jest.fn();
const mockSetDifficulty = jest.fn();
const mockDecrementHints = jest.fn();


const mockGenerateNewHand = jest.fn();
const mockSelectSituationAndPosition = jest.fn();
const mockGetLogicAvailableActions = jest.fn();
const mockGetLogicCorrectDecision = jest.fn();
const mockGetLogicHandNotation = jest.fn();

const mockUseGameState = require('../useGameState');
const mockUseGameLogic = require('../useGameLogic');

describe('usePokerGame', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    mockUseGameState.default.mockReturnValue({
      hand: ['Ah', 'Kh'],
      situationKey: 'RFI',
      positionKey: 'UTG',
      situationDisplay: 'Raise First In',
      positionDisplay: 'Under the Gun',
      lives: 3,
      score: 0,
      highScore: 0,
      streak: 0,
      wrongChoices: [],
      gameOver: false,
      availableActions: ['Raise', 'Fold'],
      difficulty: 'Easy',
      hints: 3,
      setHand: jest.fn(),
      setSituationKey: jest.fn(),
      setPositionKey: jest.fn(),
      setSituationDisplay: jest.fn(),
      setPositionDisplay: jest.fn(),
      setScore: mockSetScore,
      updateHighScore: mockUpdateHighScore,
      setStreak: mockSetStreak,
      setWrongChoices: mockSetWrongChoices,
      setGameOver: mockSetGameOver,
      setAvailableActions: jest.fn(),
      decrementLives: mockDecrementLives,
      resetLives: mockResetLives,
      resetGameScoreAndStats: mockResetGameScoreAndStats,
      setDifficulty: mockSetDifficulty,
      decrementHints: mockDecrementHints,
      // For handleIncorrectDecision related state
      setLastAnswerCorrectness: mockSetLastAnswerCorrectness, 
    });

    mockUseGameLogic.default.mockReturnValue({
      generateNewHand: mockGenerateNewHand.mockReturnValue(['Ac', 'Kc']),
      selectSituationAndPosition: mockSelectSituationAndPosition.mockReturnValue({
        newSituationKey: 'RFI_MP',
        newPositionKey: 'MP',
        newSituationDisplay: 'Raise First In MP',
        newPositionDisplay: 'Middle Position',
      }),
      getAvailableActions: mockGetLogicAvailableActions.mockReturnValue(['Raise', 'Fold']),
      getCorrectDecision: mockGetLogicCorrectDecision.mockReturnValue('Raise'), // Default correct action
      getHandNotation: mockGetLogicHandNotation.mockReturnValue('AKs'),
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('handleIncorrectDecision is called with currentCorrectAction when timer expires', () => {
    const initialHand = ['Ah', 'Ks'];
    const initialSituationKey = 'RFI_CO';
    const initialPositionKey = 'CO';
    const currentCorrectActionForTest = 'Fold'; // Specific correct action for this test case

    // Override specific mocks for this test
    mockUseGameState.default.mockReturnValueOnce({
      ...mockUseGameState.default(), // Spread the default mock return
      hand: initialHand,
      situationKey: initialSituationKey,
      positionKey: initialPositionKey,
      lives: 3, // Ensure lives > 0
      gameOver: false,
      difficulty: 'Easy',
      setHand: jest.fn(),
      setSituationKey: jest.fn(),
      setPositionKey: jest.fn(),
      setSituationDisplay: jest.fn(),
      setPositionDisplay: jest.fn(),
      setAvailableActions: jest.fn(),
      setGameOver: mockSetGameOver,
      decrementLives: mockDecrementLives,
      setStreak: mockSetStreak,
      setLastAnswerCorrectness: mockSetLastAnswerCorrectness,
      setWrongChoices: mockSetWrongChoices,
    });

    mockUseGameLogic.default.mockReturnValueOnce({
      ...mockUseGameLogic.default(), // Spread the default mock return
      generateNewHand: mockGenerateNewHand.mockReturnValue(['As', 'Kd']), // For the dealNewHand call
      selectSituationAndPosition: mockSelectSituationAndPosition.mockReturnValue({ // For dealNewHand
        newSituationKey: 'RFI_BTN', 
        newPositionKey: 'BTN', 
        newSituationDisplay: 'RFI BTN', 
        newPositionDisplay: 'Button'
      }),
      getLogicAvailableActions: mockGetLogicAvailableActions.mockReturnValue(['Raise', 'Fold']),
      getLogicCorrectDecision: mockGetLogicCorrectDecision.mockReturnValue(currentCorrectActionForTest), // Correct action for initial hand
      getHandNotation: mockGetLogicHandNotation.mockImplementation(hand => {
        if (hand === initialHand) return 'AKs'; // Notation for initial hand
        return 'ADK'; // For subsequent calls if any
      }),
    });
    
    const { result } = renderHook(() => usePokerGame());

    // Initial dealNewHand is called on mount
    act(() => {
      // dealNewHand is called inside useEffect on initial mount.
      // It sets up the first hand and the timer.
    });
    
    // Verify initial setup (optional, but good for sanity)
    expect(mockGetLogicCorrectDecision).toHaveBeenCalledWith('AKs', initialSituationKey, initialPositionKey);
    // The currentCorrectAction state inside usePokerGame should now be currentCorrectActionForTest ('Fold')

    // Advance timer to trigger timeout
    act(() => {
      jest.advanceTimersByTime(DIFFICULTY_LEVELS['Easy'].timerDuration * 1000);
    });

    // Assertions for handleIncorrectDecision
    // handleIncorrectDecision is called internally by usePokerGame.
    // We check its effects: decrementLives, setStreak(0), setLastAnswerCorrectness, setWrongChoices.
    // The key is that handleIncorrectDecision was called *because* of the timeout,
    // and it should have used the `currentCorrectAction` that was set when the hand was dealt.

    // Check that decrementLives was called, indicating handleIncorrectDecision was invoked
    expect(mockDecrementLives).toHaveBeenCalledTimes(1);
    expect(mockSetStreak).toHaveBeenCalledWith(0);
    expect(mockSetLastAnswerCorrectness).toHaveBeenCalledWith('INCORRECT');

    // Check the arguments of setWrongChoices
    // This is the most direct way to check if correctDecision was passed as currentCorrectAction
    expect(mockSetWrongChoices).toHaveBeenCalledTimes(1);
    const wrongChoiceArgs = mockSetWrongChoices.mock.calls[0][0]; // This is a function: (prevWrongChoices) => [...]
    
    // To get the actual object added to wrongChoices, we can execute this function with a dummy prev array
    const newWrongChoiceObject = wrongChoiceArgs([]); 
    
    expect(newWrongChoiceObject[0].correctDecision).toBe(currentCorrectActionForTest); // Crucial check
    expect(newWrongChoiceObject[0].yourChoice).toBe('No decision'); // From timeout
    expect(newWrongChoiceObject[0].handNotation).toBe('AKs'); // Hand at the time of timeout

    // Ensure game over is not called if lives > 0
    expect(mockSetGameOver).not.toHaveBeenCalled(); // Assuming lives were > 1

    // Ensure a new hand is dealt after timeout (if game is not over)
    // This happens in a setTimeout(dealNewHand, 500) within the timer logic
    act(() => {
        jest.advanceTimersByTime(500); // Advance past the 500ms delay for dealNewHand
    });
    expect(mockGenerateNewHand).toHaveBeenCalledTimes(2); // Initial + after timeout
  });
});
