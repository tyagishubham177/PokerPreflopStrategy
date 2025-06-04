// src/Constants/gameOverMessages.js

import i18n from '../i18n';

export const messageConfig = {
  newHighScore: () => i18n.t('gameOverMessages.newHighScore', { returnObjects: true }),
  matchedHighScore: () => i18n.t('gameOverMessages.matchedHighScore', { returnObjects: true }),
  closeToHighScore: {
    messages: () => i18n.t('gameOverMessages.closeToHighScore', { returnObjects: true }),
    condition: (score, highScore) => highScore > 0 && score > highScore * 0.8 && score < highScore,
  },
  decentScore: {
    messages: () => i18n.t('gameOverMessages.decentScore', { returnObjects: true }),
    condition: (score, highScore) => highScore > 0 && score > highScore * 0.5 && score <= highScore * 0.8,
  },
  lowScore: {
    messages: () => i18n.t('gameOverMessages.lowScore', { returnObjects: true }),
    condition: (score, highScore) => score < 500 || (highScore > 0 && score < highScore * 0.2),
  },
  defaultMessages: () => i18n.t('gameOverMessages.defaultMessages', { returnObjects: true }),
};

export const getGameOverMessage = (score, highScore, isNewHighScoreFlag) => {
  if (isNewHighScoreFlag) {
    const messages = messageConfig.newHighScore();
    return messages[Math.floor(Math.random() * messages.length)];
  }
  // Ensure score > 0 for matchedHighScore to avoid matching when score is 0 and highScore is 0.
  if (score === highScore && score > 0) {
    const messages = messageConfig.matchedHighScore();
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Check conditional categories
  // Order matters: check from most specific/highest score band to lowest
  if (messageConfig.closeToHighScore.condition(score, highScore)) {
    const messages = messageConfig.closeToHighScore.messages();
    return messages[Math.floor(Math.random() * messages.length)];
  }
  if (messageConfig.decentScore.condition(score, highScore)) {
    const messages = messageConfig.decentScore.messages();
    return messages[Math.floor(Math.random() * messages.length)];
  }
  if (messageConfig.lowScore.condition(score, highScore)) {
    const messages = messageConfig.lowScore.messages();
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Fallback to default messages
  const defaultMessages = messageConfig.defaultMessages();
  return defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
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
