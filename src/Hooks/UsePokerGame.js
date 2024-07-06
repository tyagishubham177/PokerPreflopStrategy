import { useState, useEffect } from 'react';
import { positions, suits, ranks } from '../Constants/GameConstants';
import { initialPokerStrategy } from '../Constants/InitialStrategy';

const usePokerGame = () => {
  const [hand, setHand] = useState([]);
  const [position, setPosition] = useState('');
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongChoices, setWrongChoices] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pokerStrategy, setPokerStrategy] = useState(initialPokerStrategy);
  const [editedStrategy, setEditedStrategy] = useState(JSON.stringify(initialPokerStrategy, null, 2));
  const [situation, setSituation] = useState('');

  useEffect(() => {
    dealNewHand();
  }, []);

  const dealNewHand = () => {
    const newHand = [];
    while (newHand.length < 2) {
      const card = `${ranks[Math.floor(Math.random() * ranks.length)]}${
        suits[Math.floor(Math.random() * suits.length)]
      }`;
      if (!newHand.includes(card)) {
        newHand.push(card);
      }
    }
    setHand(newHand);
    const newPosition = positions[Math.floor(Math.random() * positions.length)].name;
    setPosition(newPosition);

    const situations = Object.keys(pokerStrategy);
    const randomSituation = situations[Math.floor(Math.random() * situations.length)];
    setSituation(randomSituation);
  };

  const makeDecision = (decision) => {
    const handNotation = `${hand[0][0]}${hand[1][0]}${hand[0][1] === hand[1][1] ? 's' : 'o'}`;
    const correctDecision = getCorrectDecision(handNotation);

    if (decision === correctDecision) {
      const points = 10 * (1 + streak * 0.1);
      setScore((prevScore) => prevScore + points);
      setStreak((prevStreak) => prevStreak + 1);
      setHighScore((prevHighScore) => Math.max(prevHighScore, score + points));
    } else {
      setLives((prevLives) => prevLives - 1);
      setStreak(0);
      setWrongChoices((prevWrongChoices) => [...prevWrongChoices, { hand, position, correctDecision }]);
    }

    if (lives > 1) {
      dealNewHand();
    } else {
      setGameOver(true);
    }
  };

  const getCorrectDecision = (handNotation) => {
    const situationData = pokerStrategy[situation][position];
    if (!situationData) return 'fold';

    if (
      situationData['Raise for Value']?.includes(handNotation) ||
      situationData['3-bet for Value']?.includes(handNotation)
    ) {
      return 'raise';
    } else if (situationData['Call']?.includes(handNotation)) {
      return 'call';
    } else {
      return 'fold';
    }
  };

  const restartGame = () => {
    setLives(3);
    setScore(0);
    setStreak(0);
    setWrongChoices([]);
    setGameOver(false);
    dealNewHand();
  };

  const handleStrategyChange = (e) => {
    setEditedStrategy(e.target.value);
  };

  const saveStrategy = () => {
    try {
      const newStrategy = JSON.parse(editedStrategy);
      setPokerStrategy(newStrategy);
      setShowSettings(false);
    } catch (error) {
      alert('Invalid JSON. Please check your input.');
    }
  };

  return {
    hand,
    position,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    showSettings,
    setShowSettings,
    editedStrategy,
    situation,
    makeDecision,
    restartGame,
    handleStrategyChange,
    saveStrategy,
  };
};

export default usePokerGame;