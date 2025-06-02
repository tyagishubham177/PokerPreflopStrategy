// src/Constants/gameOverMessages.js

export const messageConfig = {
  newHighScore: [
    "Wow! New High Score! You're a legend!",
    "Incredible! You've set a new benchmark!",
    "New High Score! Absolutely crushed it!",
    "That's how it's done! New High Score!",
  ],
  matchedHighScore: [
    "So close! You matched the high score! Amazing effort!",
    "Matched the high score! You're right at the top!",
    "Excellent work! You've equaled the high score!",
  ],
  closeToHighScore: { // e.g., score > 80% of highScore
    messages: [
      "Almost there! Just a bit more to the top!",
      "Great run! You're knocking on the door of a new high score!",
      "So close to the high score! Keep pushing!",
    ],
    condition: (score, highScore) => highScore > 0 && score > highScore * 0.8 && score < highScore,
  },
  decentScore: { // e.g., score > 50% of highScore
    messages: [
      "Nice job! That's a solid score!",
      "Good game! You're getting the hang of it!",
      "Well played! Keep practicing to climb higher!",
    ],
    condition: (score, highScore) => highScore > 0 && score > highScore * 0.5 && score <= highScore * 0.8,
  },
  lowScore: { // e.g., score < 20% of highScore or absolute low score (e.g. < 500 points if highScore is very low or 0)
    messages: [
      "Better luck next time! Every game is a lesson.",
      "Don't worry, keep practicing and you'll improve!",
      "A tough round, but persistence is key!",
      "Shake it off and go for it again!",
    ],
    condition: (score, highScore) => score < 500 || (highScore > 0 && score < highScore * 0.2),
  },
  defaultMessages: [ // Fallback messages
    "Good effort! Ready for another round?",
    "Thanks for playing! Try to beat your score next time!",
  ],
};

export const getGameOverMessage = (score, highScore, isNewHighScoreFlag) => {
  if (isNewHighScoreFlag) {
    return messageConfig.newHighScore[Math.floor(Math.random() * messageConfig.newHighScore.length)];
  }
  // Ensure score > 0 for matchedHighScore to avoid matching when score is 0 and highScore is 0.
  if (score === highScore && score > 0) {
    return messageConfig.matchedHighScore[Math.floor(Math.random() * messageConfig.matchedHighScore.length)];
  }

  // Check conditional categories
  // Order matters: check from most specific/highest score band to lowest
  if (messageConfig.closeToHighScore.condition(score, highScore)) {
    const messages = messageConfig.closeToHighScore.messages;
    return messages[Math.floor(Math.random() * messages.length)];
  }
  if (messageConfig.decentScore.condition(score, highScore)) {
    const messages = messageConfig.decentScore.messages;
    return messages[Math.floor(Math.random() * messages.length)];
  }
  if (messageConfig.lowScore.condition(score, highScore)) {
    const messages = messageConfig.lowScore.messages;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Fallback to default messages
  return messageConfig.defaultMessages[Math.floor(Math.random() * messageConfig.defaultMessages.length)];
};

// Example usage (for testing in a Node environment or browser console):
// console.log("New High Score:", getGameOverMessage(1200, 1000, true));
// console.log("Matched High Score (score > 0):", getGameOverMessage(1000, 1000, false));
// console.log("Matched High Score (score = 0, hs = 0):", getGameOverMessage(0, 0, false)); // Should be low/default
// console.log("Close to High Score:", getGameOverMessage(850, 1000, false));
// console.log("Decent Score:", getGameOverMessage(600, 1000, false));
// console.log("Low Score (percentage):", getGameOverMessage(150, 1000, false));
// console.log("Low Score (absolute < 500):", getGameOverMessage(400, 0, false));
// console.log("Low Score (absolute < 500, hs > 0):", getGameOverMessage(400, 8000, false));
// console.log("Default (e.g. score=550, hs=0):", getGameOverMessage(550, 0, false));
// console.log("Default (e.g. score=550, hs=600, but doesn't meet other conditions):", getGameOverMessage(550, 600, false));
