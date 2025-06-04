// src/Constants/gameOverMessages.js

/**
 * Selects a random element from an array.
 * @param {string[]} arr
 * @returns {string}
 */
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Returns a localized positive or consoling message based on the final score.
 * @param {Function} t translation function from react-i18next
 * @param {number} score player's score
 * @param {number} highScore stored high score
 * @param {boolean} isNewHighScoreFlag whether a new high score was set
 * @returns {string}
 */
export const getGameOverMessage = (t, score, highScore, isNewHighScoreFlag) => {
  const cfg = {
    newHighScore: t('gameOverMessages.newHighScore', { returnObjects: true }),
    matchedHighScore: t('gameOverMessages.matchedHighScore', { returnObjects: true }),
    closeToHighScore: {
      messages: t('gameOverMessages.closeToHighScore', { returnObjects: true }),
      condition: (s, h) => h > 0 && s > h * 0.8 && s < h,
    },
    decentScore: {
      messages: t('gameOverMessages.decentScore', { returnObjects: true }),
      condition: (s, h) => h > 0 && s > h * 0.5 && s <= h * 0.8,
    },
    lowScore: {
      messages: t('gameOverMessages.lowScore', { returnObjects: true }),
      condition: (s, h) => s < 500 || (h > 0 && s < h * 0.2),
    },
    defaultMessages: t('gameOverMessages.defaultMessages', { returnObjects: true }),
  };

  if (isNewHighScoreFlag) {
    return sample(cfg.newHighScore);
  }

  if (score === highScore && score > 0) {
    return sample(cfg.matchedHighScore);
  }

  if (cfg.closeToHighScore.condition(score, highScore)) {
    return sample(cfg.closeToHighScore.messages);
  }
  if (cfg.decentScore.condition(score, highScore)) {
    return sample(cfg.decentScore.messages);
  }
  if (cfg.lowScore.condition(score, highScore)) {
    return sample(cfg.lowScore.messages);
  }

  return sample(cfg.defaultMessages);
};

export default getGameOverMessage;

