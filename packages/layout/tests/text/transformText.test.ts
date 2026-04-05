import transformText from '../../src/text/transformText';

describe('transformText', () => {
  describe('text transformation', () => {
    test('should return text as-is when no transformation specified', () => {
      const text = 'Hello World';
      expect(transformText(text, undefined)).toBe('Hello World');
    });

    test('should transform text to uppercase', () => {
      const text = 'hello world';
      expect(transformText(text, 'uppercase')).toBe('HELLO WORLD');
    });

    test('should transform text to lowercase', () => {
      const text = 'HELLO WORLD';
      expect(transformText(text, 'lowercase')).toBe('hello world');
    });

    test('should capitalize text', () => {
      const text = 'hello world';
      expect(transformText(text, 'capitalize')).toBe('Hello World');
    });

    test('should uppercase first letter', () => {
      const text = 'hello world';
      expect(transformText(text, 'upperfirst')).toBe('Hello world');
    });
  });

  describe('Thai text normalization', () => {
    test('should normalize Thai composed character ำ to decomposed form', () => {
      // Thai character ำ (U+0E33) is decomposed by font engines into
      // ํ (U+0E4D) + า (U+0E32), causing index mismatches.
      // We pre-normalize to prevent truncation issues.
      const thaiComposed = 'กำก'; // ก + ำ + ก (3 characters)
      const result = transformText(thaiComposed, undefined);

      // After normalization, ำ becomes ํ + า
      // So the string should have 4 code points: ก + ํ + า + ก
      expect(result.length).toBe(4);
      expect(result).toBe('กําก');
    });

    test('should handle multiple Thai composed characters', () => {
      const thaiText = 'กำกำ';
      const result = transformText(thaiText, undefined);

      // Each ำ becomes ํ + า, so 4 chars become 6
      expect(result.length).toBe(6);
      expect(result).toBe('กํากํา');
    });

    test('should normalize Thai characters with uppercase transformation', () => {
      // This test ensures normalization happens before transformation
      const thaiText = 'กำก';
      const result = transformText(thaiText, 'uppercase');

      // Should normalize first, then uppercase
      expect(result.length).toBe(4);
    });

    test('should handle empty string', () => {
      expect(transformText('', undefined)).toBe('');
    });

    test('should handle text without Thai characters', () => {
      const text = 'Hello World 123';
      expect(transformText(text, undefined)).toBe('Hello World 123');
    });

    test('should handle mixed text with Thai and Latin characters', () => {
      const mixedText = 'Hello กำ World';
      const result = transformText(mixedText, undefined);

      // ำ should be decomposed to ํ + า
      expect(result).toBe('Hello กํา World');
      expect(result.length).toBe(16); // Original 15 + 1 extra from decomposition
    });

    test('should handle Thai text with other transformations', () => {
      const thaiText = 'กำลังทดสอบ';
      const resultLower = transformText(thaiText, 'lowercase');
      const resultCapitalize = transformText(thaiText, 'capitalize');

      // Normalization should happen regardless of transformation type
      expect(resultLower).toContain('ํ');
      expect(resultLower).toContain('า');
      expect(resultCapitalize).toContain('ํ');
      expect(resultCapitalize).toContain('า');
    });
  });
});
