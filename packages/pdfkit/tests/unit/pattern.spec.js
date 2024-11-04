import { beforeEach, describe, expect, test } from 'vitest';

import PDFDocument from '../../src/document';
import { logData } from './helpers';
import matcher from './toContainChunk';

expect.extend(matcher);

describe('Pattern', () => {
  let document;

  beforeEach(() => {
    document = new PDFDocument({
      info: { CreationDate: new Date(Date.UTC(2018, 1, 1)) },
      compress: false
    });
  });

  test('Uncolored tiling pattern', () => {
    const docData = logData(document);
    const patternStream = '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s';
    const binaryStream = Buffer.from(`${patternStream}\n`, 'binary');
    const pattern = document.pattern([1, 1, 4, 4], 3, 3, patternStream);
    document
      .rect(0, 0, 100, 100)
      .fill([pattern, 'blue'])
      .end();

    // empty resources
    expect(docData).toContainChunk(['10 0 obj', `<<\n>>`]);

    // pattern dictionary
    expect(docData).toContainChunk([
      '11 0 obj',
      `<<
/Type /Pattern
/PatternType 1
/PaintType 2
/TilingType 2
/BBox [1 1 4 4]
/XStep 3
/YStep 3
/Matrix [1 0 0 -1 0 792]
/Resources 10 0 R
/Length 32
>>`,
      'stream',
      binaryStream,
      '\nendstream'
    ]);

    // page resource dictionary with color space and pattern
    expect(docData).toContainChunk([
      '6 0 obj',
      `<<
/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/ColorSpace <<
/CsPDeviceCMYK 8 0 R
/CsPDeviceRGB 9 0 R
>>
/Pattern <<
/P1 11 0 R
>>
>>`
    ]);
    // map to the underlying color space
    expect(docData).toContainChunk(['8 0 obj', `[/Pattern /DeviceCMYK]`]);
    expect(docData).toContainChunk(['9 0 obj', `[/Pattern /DeviceRGB]`]);
    // graphics
    const graphicsStream = Buffer.from(
      `1 0 0 -1 0 792 cm
0 0 100 100 re
/CsPDeviceRGB cs
0 0 1 /P1 scn
f\n`,
      'binary'
    );
    expect(docData).toContainChunk([
      '5 0 obj',
      `<<
/Length 66
>>`,
      'stream',
      graphicsStream,
      '\nendstream'
    ]);
  });

  test('Pattern naming', () => {
    const docData = logData(document);
    const pattern1 = document.pattern(
      [1, 1, 4, 4],
      3,
      3,
      '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
    );
    const pattern2 = document.pattern(
      [1, 1, 7, 7],
      6,
      6,
      '1 w 0 1 m 7 8 l s 5 0 m 8 3 l s'
    );
    document.rect(0, 0, 100, 100).fill([pattern1, 'blue']);
    document
      .rect(0, 0, 100, 100)
      .fill([pattern2, 'red'])
      .end();

    // patterns P1 and P2
    expect(docData).toContainChunk([
      '6 0 obj',
      `<<
/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
/ColorSpace <<
/CsPDeviceCMYK 8 0 R
/CsPDeviceRGB 9 0 R
>>
/Pattern <<
/P1 11 0 R
/P2 13 0 R
>>
>>`
    ]);
  });
});
