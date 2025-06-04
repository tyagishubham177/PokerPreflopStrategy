import { getGameOverMessage, messageConfig } from './gameOverMessages';

describe('getGameOverMessage', () => {
  // Optional: Mock Math.random if you want to test for specific messages from arrays.
  // For now, we'll check if the returned message is part of the correct category array.

  // Test Case 1: New High Score
  describe('New High Score', () => {
    it('should return a new high score message when isNewHighScoreFlag is true (score > highScore)', () => {
      const message = getGameOverMessage(1200, 1000, true);
      expect(messageConfig.newHighScore()).toContain(message);
    });

    it('should return a new high score message when isNewHighScoreFlag is true (score is high, highScore was 0)', () => {
      const message = getGameOverMessage(1500, 0, true);
      expect(messageConfig.newHighScore()).toContain(message);
    });

    it('should return a new high score message even if score is 0, if flagged as new high score (e.g. first game ever and HS was -Infinity)', () => {
      // This scenario depends on how isNewHighScoreFlag is set by the caller.
      // Assuming the flag is authoritative.
      const message = getGameOverMessage(0, 0, true);
      expect(messageConfig.newHighScore()).toContain(message);
    });
  });

  // Test Case 2: Matched High Score
  describe('Matched High Score', () => {
    it('should return a matched high score message for score === highScore, score > 0, and isNewHighScoreFlag is false', () => {
      const message = getGameOverMessage(1000, 1000, false);
      expect(messageConfig.matchedHighScore()).toContain(message);
    });

    it('should not return matched high score if score is 0, even if highScore is also 0', () => {
      const message = getGameOverMessage(0, 0, false);
      expect(messageConfig.matchedHighScore()).not.toContain(message);
    });
  });

  // Test Case 3: Close to High Score
  describe('Close to High Score', () => {
    it('should return a closeToHighScore message for scores >80% and <100% of highScore', () => {
      const score = 850, highScore = 1000;
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.closeToHighScore.messages()).toContain(message);
    });

    it('should return a closeToHighScore message for scores at the upper boundary (just below HS)', () => {
      const score = 999, highScore = 1000;
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.closeToHighScore.messages()).toContain(message);
    });
    
    it('should not return closeToHighScore if score is equal to highScore', () => {
      const score = 1000, highScore = 1000;
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(false);
    });
  });

  // Test Case 4: Decent Score
  describe('Decent Score', () => {
    it('should return a decentScore message for scores >50% and <=80% of highScore', () => {
      const score = 650, highScore = 1000;
      expect(messageConfig.decentScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.decentScore.messages()).toContain(message);
    });

    it('should return a decentScore message for scores at the 80% boundary', () => {
      const score = 800, highScore = 1000;
      expect(messageConfig.decentScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.decentScore.messages()).toContain(message);
    });

     it('should return a decentScore message for scores at the lower boundary (>50%)', () => {
      const score = 501, highScore = 1000;
      expect(messageConfig.decentScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.decentScore.messages()).toContain(message);
    });
  });

  // Test Case 5: Low Score (Percentage-based)
  describe('Low Score (Percentage-based)', () => {
    it('should return a lowScore message for scores <20% of highScore (and score < 500 is false)', () => {
      // Ensure score is high enough not to trigger absolute low score first if HS is very high
      const score = 150, highScore = 1000; // 15%
      expect(score < 500).toBe(true); // This will also be true, condition is OR
      expect(highScore > 0 && score < highScore * 0.2).toBe(true);
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.lowScore.messages()).toContain(message);
    });

    it('should return a lowScore message for scores <20% of a large highScore (where score itself > 500)', () => {
      const score = 550, highScore = 10000; // 5.5%
      expect(score < 500).toBe(false);
      expect(highScore > 0 && score < highScore * 0.2).toBe(true);
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.lowScore.messages()).toContain(message);
    });
  });

  // Test Case 6: Low Score (Absolute)
  describe('Low Score (Absolute)', () => {
    it('should return a lowScore message for scores < 500 when highScore is 0', () => {
      const score = 400, highScore = 0;
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.lowScore.messages()).toContain(message);
    });

    it('should return a lowScore message for scores < 500 even if highScore is high (but percentage condition might also be true)', () => {
      const score = 300, highScore = 5000; // 300 < 500 is true, 300 < 5000 * 0.2 (1000) is true
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.lowScore.messages()).toContain(message);
    });

     it('should return a lowScore message for score = 0, highScore = 0', () => {
      const score = 0, highScore = 0;
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.lowScore.messages()).toContain(message);
    });
  });

  // Test Case 7: Default Messages
  describe('Default Messages', () => {
    it('should return a default message for score = 0, highScore = 0, if not caught by lowScore', () => {
      // This case IS caught by lowScore (score < 500) based on current conditions.
      // So this test verifies it's NOT matchedHighScore and IS lowScore.
      const score = 0, highScore = 0;
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.matchedHighScore()).not.toContain(message);
      expect(messageConfig.lowScore.messages()).toContain(message);
      // To explicitly test default, we need a case not covered by others.
    });

    it('should return a default message if score does not meet any other category (e.g. between low and decent, if such a gap exists)', () => {
      // Example: score = 450, highScore = 1000.
      // lowScore condition: score < 500 (true) || (1000 > 0 && 450 < 1000 * 0.2 (200)) (false) -> true, so it's low.
      // Let's find a true default case.
      // Current conditions:
      // closeToHighScore: score > highScore * 0.8 && score < highScore (e.g. 801-999 for HS 1000)
      // decentScore: score > highScore * 0.5 && score <= highScore * 0.8 (e.g. 501-800 for HS 1000)
      // lowScore: score < 500 || (highScore > 0 && score < highScore * 0.2) (e.g. <500 or <200 for HS 1000)
      // Test case: highScore = 1000.
      // score = 500. Not close (false). Not decent (false, needs >0.5). Not low (false, 500 is not <500, and 500 is not <200). -> Default
      const score = 500, highScore = 1000;
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(false);
      expect(messageConfig.decentScore.condition(score, highScore)).toBe(false);
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(false);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.defaultMessages()).toContain(message);
    });

    it('should return a default message when highScore is 0 and score is >= 500 (not low, not new, not matched)', () => {
      const score = 550, highScore = 0;
      // isNewHighScore is false.
      // score !== highScore (550 !== 0).
      // closeToHighScore.condition(550, 0) is false (highScore > 0 is false).
      // decentScore.condition(550, 0) is false (highScore > 0 is false).
      // lowScore.condition(550, 0) is false (550 < 500 is false, highScore > 0 is false).
      // So, it should be default.
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(false);
      expect(messageConfig.decentScore.condition(score, highScore)).toBe(false);
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(false);
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.defaultMessages()).toContain(message);
    });

    it('should prioritize newHighScore over all other categories', () => {
      // Score qualifies for "lowScore" but isNewHighScore is true
      const score = 100, highScore = 1000;
      expect(messageConfig.lowScore.condition(score, highScore)).toBe(true);
      const message = getGameOverMessage(score, highScore, true); // isNewHighScoreFlag = true
      expect(messageConfig.newHighScore()).toContain(message);
      expect(messageConfig.lowScore.messages()).not.toContain(message);
    });

    it('should prioritize matchedHighScore over conditional categories if isNewHighScore is false', () => {
      // Score qualifies for "closeToHighScore" but also matches highScore
      const score = 900, highScore = 900; // Matched and also > 80%
      expect(messageConfig.closeToHighScore.condition(score, highScore)).toBe(false); // score < highScore is false
      // MatchedHighScore condition: score === highScore && score > 0
      const message = getGameOverMessage(score, highScore, false);
      expect(messageConfig.matchedHighScore()).toContain(message);
      expect(messageConfig.closeToHighScore.messages()).not.toContain(message);
    });
  });
});
