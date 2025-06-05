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

