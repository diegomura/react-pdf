import { describe, expect, test } from 'vitest';

import * as primitives from '../src/index';
import { Primitive } from '../../types/primitive.d';

describe('Primitive enum stays in sync with primitives', () => {
  test('every enum member matches @react-pdf/primitives', () => {
    for (const [name, value] of Object.entries(Primitive)) {
      const primitiveValue = (primitives as Record<string, string>)[name];
      expect(
        primitiveValue,
        `Primitive.${name} ('${value}') not found in @react-pdf/primitives`,
      ).toBeDefined();
      expect(value).toBe(primitiveValue);
    }
  });

  test('every primitive has an enum member', () => {
    for (const [name, value] of Object.entries(primitives)) {
      expect(
        Primitive[name as keyof typeof Primitive],
        `@react-pdf/primitives.${name} ('${value}') missing from Primitive enum`,
      ).toBe(value);
    }
  });
});
