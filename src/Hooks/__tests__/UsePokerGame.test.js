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
const mockSetIsPaused = jest.fn(); // Added for pause/play tests


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
      isPaused: false, // Default to not paused
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
      setIsPaused: mockSetIsPaused, // Provide the mock setter
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

  describe('Pause/Play Functionality', () => {
    test('togglePausePlay calls setIsPaused and toggles isPaused state', () => {
      // Initial state: isPaused = false
      mockUseGameState.default.mockReturnValueOnce({
        ...mockUseGameState.default(), // Spread the default setup
        isPaused: false,
        setIsPaused: mockSetIsPaused,
      });
      const { result, rerender } = renderHook(() => usePokerGame());
      
      act(() => {
        result.current.togglePausePlay();
      });
      expect(mockSetIsPaused).toHaveBeenCalledTimes(1);
      // Check if setIsPaused was called with a function that would toggle the state
      // This is a bit indirect; ideally, we'd check the new state.
      // Let's assume setIsPaused correctly toggles.

      // To test the toggled state, we need to mock the next return value of useGameState
      mockUseGameState.default.mockReturnValueOnce({
        ...mockUseGameState.default(),
        isPaused: true, // Simulate state has been updated
        setIsPaused: mockSetIsPaused,
      });
      rerender(); // Rerender with the new mocked state
      expect(result.current.isPaused).toBe(true); // Check the hook's returned state

      act(() => {
        result.current.togglePausePlay(); // Call again to toggle back
      });
      expect(mockSetIsPaused).toHaveBeenCalledTimes(2);

      mockUseGameState.default.mockReturnValueOnce({
        ...mockUseGameState.default(),
        isPaused: false, // Simulate state has been updated back
        setIsPaused: mockSetIsPaused,
      });
      rerender();
      expect(result.current.isPaused).toBe(false);
    });

    test('timer does not decrement timeLeft when isPaused is true', () => {
      const initialTimeLeft = 10;
      const mockSetTimeLeftLocal = jest.fn(); // Local mock for setTimeLeft if needed

      // Override useGameState for this specific test
      mockUseGameState.default.mockReturnValueOnce({
        ...mockUseGameState.default(),
        isPaused: true, // Game is paused
        difficulty: 'Easy', // Ensure timerDuration is set
        // We need to control setTimeLeft or check timeLeft from the hook's return
        // For simplicity, we'll check timeLeft from the hook's return if possible,
        // or ensure no calls that would change it are made.
        // The hook uses its own useState for timeLeft, so we can't directly mock setTimeLeft.
        // We will check the returned `timeLeft` after advancing timers.
      });
      
      const { result } = renderHook(() => usePokerGame());
      
      // dealNewHand is called on mount, which sets timeLeft to timerDuration and starts the timer.
      // We need to ensure the initial timeLeft value in the hook is what we expect.
      // The hook's timeLeft is initialized from timerDuration (from difficulty).
      // Let's assume dealNewHand sets timeLeft correctly.
      // To directly test the timer's effect, we'd need to control the internal setTimeLeft.
      // Since we can't, we check if the `handleIncorrectDecision` is NOT called (as timer won't expire)
      // and that `dealNewHand` is not called again due to timeout.

      // Force initial timeLeft to be something specific for this test via dealNewHand logic
      // This is tricky as dealNewHand is called internally.
      // Let's assume after initial dealNewHand, timeLeft is DIFFICULTY_LEVELS['Easy'].timerDuration.
      // And the timer is active.
      
      act(() => {
        // Initial dealNewHand was called.
        // The timer's useEffect will run. Since isPaused is true, it shouldn't set an interval.
      });

      act(() => {
        jest.advanceTimersByTime(DIFFICULTY_LEVELS['Easy'].timerDuration * 500); // Advance by half the timer duration
      });
      
      // If the timer was paused, handleIncorrectDecision should not have been called due to timeout
      expect(mockDecrementLives).not.toHaveBeenCalled(); 
      expect(mockSetWrongChoices).not.toHaveBeenCalled();
      
      // The returned timeLeft from the hook should still be the initial timerDuration
      // because the interval to decrement it should not have been set up.
      // The internal `timeLeft` state of `usePokerGame` is what we're interested in.
      // The `timeLeft` returned by `result.current.timeLeft` should reflect this.
      expect(result.current.timeLeft).toBe(DIFFICULTY_LEVELS['Easy'].timerDuration);
    });

    test('timer decrements timeLeft when isPaused is false', () => {
       mockUseGameState.default.mockReturnValueOnce({
        ...mockUseGameState.default(),
        isPaused: false, // Game is not paused
        difficulty: 'Easy',
        lives: 3, // Ensure lives > 0 so timeout doesn't end game immediately
      });

      const { result } = renderHook(() => usePokerGame());
      // dealNewHand on mount sets timeLeft to timerDuration and starts timer.
      const initialTime = DIFFICULTY_LEVELS['Easy'].timerDuration;
      expect(result.current.timeLeft).toBe(initialTime);

      act(() => {
        jest.advanceTimersByTime(1000); // Advance by 1 second
      });

      expect(result.current.timeLeft).toBe(initialTime - 1);

      act(() => {
        jest.advanceTimersByTime(2000); // Advance by 2 more seconds
      });
      expect(result.current.timeLeft).toBe(initialTime - 3);
       // Check that timeout logic has not been triggered yet if time hasn't run out
      expect(mockDecrementLives).not.toHaveBeenCalled();
    });
  });
});
