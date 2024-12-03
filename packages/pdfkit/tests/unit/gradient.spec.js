import { beforeEach, describe, expect, test } from 'vitest';

import PDFDocument from '../../src/document';
import { logData } from './helpers';
import matcher from './toContainChunk';

expect.extend(matcher);

describe('Gradient', () => {
  let document;

  beforeEach(() => {
    document = new PDFDocument({
      info: { CreationDate: new Date(Date.UTC(2018, 1, 1)) }
    });
  });

  test('Multiple stops', () => {
    const docData = logData(document);
    const gradient = document.linearGradient(0, 0, 300, 0);
    gradient
      .stop(0, 'green')
      .stop(0.5, 'red')
      .stop(1, 'green');
    document.rect(0, 0, 300, 300).fill(gradient);
    document.end();

    expect(docData).toContainChunk([
      '8 0 obj',
      `<<
/FunctionType 2
/Domain [0 1]
/C0 [0 0.501961 0]
/C1 [1 0 0]
/N 1
>>`
    ]);
    expect(docData).toContainChunk([
      '9 0 obj',
      `<<
/FunctionType 2
/Domain [0 1]
/C0 [1 0 0]
/C1 [0 0.501961 0]
/N 1
>>`
    ]);

    expect(docData).toContainChunk([
      '10 0 obj',
      `<<
/FunctionType 3
/Domain [0 1]
/Functions [8 0 R 9 0 R]
/Bounds [0.5]
/Encode [0 1 0 1]
>>`
    ]);

    expect(docData).toContainChunk([
      '11 0 obj',
      `<<
/ShadingType 2
/ColorSpace /DeviceRGB
/Coords [0 0 300 0]
/Function 10 0 R
/Extend [true true]
>>`
    ]);

    expect(docData).toContainChunk([
      '12 0 obj',
      `<<
/Type /Pattern
/PatternType 2
/Shading 11 0 R
/Matrix [1 0 0 -1 0 792]
>>`
    ]);
  });
});
