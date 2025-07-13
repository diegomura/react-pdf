import { describe, expect, test } from 'vitest';
import layoutEngine, {
  scriptItemizer,
  bidi,
  linebreaker,
  justification,
  textDecoration,
  fontSubstitution,
} from '../../src';
import FontStore from '@react-pdf/font';

describe('layoutEngine', () => {
  test('should layout text', () => {
    const layoutEngineInstance = layoutEngine({
      scriptItemizer,
      bidi,
      linebreaker,
      justification,
      textDecoration,
      fontSubstitution,
    });

    const fontStore = new FontStore();
    const font = [
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fontStyle: 'normal',
      })?.data,
    ];

    const attributedString = {
      string: 'Potentieel broeikas­gas­emissie­rapport',
      runs: [
        {
          start: 0,
          end: 39,
          attributes: { font },
        },
      ],
    };
    const container = {
      x: 0,
      y: 0,
      width: 98,
      height: 200,
    };
    const options = {
      shrinkWhitespaceFactor: {
        before: -0.5,
        after: -0.5,
      },
    };

    const output = layoutEngineInstance(attributedString, container, options);
    expect(output).toMatchFileSnapshot('layoutEngineOutput.json');
  });
});
