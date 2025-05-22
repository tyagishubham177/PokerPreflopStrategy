import { POSITION_LABELS, SITUATION_LABELS, getLabel } from './GameLabels';

describe('POSITION_LABELS', () => {
  it('should have the correct structure and values for "No Raise" types', () => {
    const key = 'UTG';
    expect(POSITION_LABELS[key]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[key].label).toBe("No Raise - UTG - N/A");
    expect(POSITION_LABELS[key].hero).toBe("UTG");
    expect(POSITION_LABELS[key].villain).toBe("N/A");

    const keySB = 'SB';
    expect(POSITION_LABELS[keySB]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[keySB].label).toBe("No Raise - From SB - N/A");
    expect(POSITION_LABELS[keySB].hero).toBe("SB");
    expect(POSITION_LABELS[keySB].villain).toBe("N/A");
  });

  it('should have the correct structure and values for "Facing raise" types', () => {
    const key = 'UTG+1 vs UTG';
    expect(POSITION_LABELS[key]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[key].label).toBe("Facing raise - UTG+1 - UTG");
    expect(POSITION_LABELS[key].hero).toBe("UTG+1");
    expect(POSITION_LABELS[key].villain).toBe("UTG");

    const keyBBvsBTN = 'BB vs BTN';
    expect(POSITION_LABELS[keyBBvsBTN]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[keyBBvsBTN].label).toBe("Facing raise - Big Blind - Button");
    expect(POSITION_LABELS[keyBBvsBTN].hero).toBe("BB");
    expect(POSITION_LABELS[keyBBvsBTN].villain).toBe("BTN");
  });

  it('should have the correct structure and values for "Facing 3-Bet" types', () => {
    const key = 'LJ vs HJ';
    expect(POSITION_LABELS[key]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[key].label).toBe("Facing 3-Bet - Lojack - Hijack");
    expect(POSITION_LABELS[key].hero).toBe("LJ");
    expect(POSITION_LABELS[key].villain).toBe("HJ");

    const keyUTGvsCOBTN = 'UTG vs CO/BTN';
    expect(POSITION_LABELS[keyUTGvsCOBTN]).toBeInstanceOf(Object);
    expect(POSITION_LABELS[keyUTGvsCOBTN].label).toBe("Facing 3-Bet - UTG - Cutoff/Button");
    expect(POSITION_LABELS[keyUTGvsCOBTN].hero).toBe("UTG");
    expect(POSITION_LABELS[keyUTGvsCOBTN].villain).toBe("CO/BTN");
  });
});

describe('getLabel', () => {
  describe('with SITUATION_LABELS', () => {
    it('should return the correct label for an existing key', () => {
      const key = 'RFI';
      const expectedLabel = "You're Raising First";
      expect(getLabel(SITUATION_LABELS, key)).toBe(expectedLabel);
    });

    it('should return the key itself for a non-existing key', () => {
      const key = 'NON_EXISTING_SITUATION_KEY';
      expect(getLabel(SITUATION_LABELS, key)).toBe(key);
    });

    it('should return the key for a key that exists but has an empty string value', () => {
      const tempSituationLabels = { ...SITUATION_LABELS, EMPTY_LABEL_KEY: "" };
      const key = 'EMPTY_LABEL_KEY';
      expect(getLabel(tempSituationLabels, key)).toBe(""); // Or key, depending on desired behavior for empty strings
    });
  });

  describe('with POSITION_LABELS', () => {
    it('should return the "label" property for an existing key', () => {
      const key = 'UTG';
      const expectedLabelString = "No Raise - UTG - N/A";
      expect(getLabel(POSITION_LABELS, key)).toBe(expectedLabelString);

      const keyFacingRaise = 'CO vs LJ';
      const expectedLabelStringFacingRaise = "Facing raise - Cutoff - Lojack";
      expect(getLabel(POSITION_LABELS, keyFacingRaise)).toBe(expectedLabelStringFacingRaise);
    });

    it('should return the key itself for a non-existing key', () => {
      const key = 'NON_EXISTING_POSITION_KEY';
      expect(getLabel(POSITION_LABELS, key)).toBe(key);
    });

    it('should handle keys that might look like object prototype properties', () => {
        const key = 'constructor';
        expect(getLabel(POSITION_LABELS, key)).toBe(key);
    });
  });
});
