/* eslint-disable no-console */

import parse from 'postcss-value-parser/lib/parse.js';
import parseUnit from 'postcss-value-parser/lib/unit.js';

const BOX_MODEL_UNITS = 'px,in,mm,cm,pt,%,vw,vh';

const logError = (style: any, value: any) => {
  const name = style.toString();

  console.error(`
    @react-pdf/stylesheet parsing error:

    ${name}: ${value},
    ${' '.repeat(name.length + 2)}^
    Unsupported ${name} value format
  `);
};

const expandBoxModel =
  <S, E>({
    expandsTo,
    maxValues = 1,
    autoSupported = false,
  }: {
    expandsTo?: ({
      first,
      second,
      third,
      fourth,
    }: Record<string, string | number>) => E;
    maxValues?: number;
    autoSupported?: boolean;
  } = {}) =>
  <K extends keyof S>(model: K, value: S[K]) => {
    const nodes = parse(`${value}`);

    const parts = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // value contains `calc`, `url` or other css function
      // `,`, `/` or strings that unsupported by margin and padding
      if (
        node.type === 'function' ||
        node.type === 'string' ||
        node.type === 'div'
      ) {
        logError(model, value);

        return {} as E;
      }

      if (node.type === 'word') {
        if (node.value === 'auto' && autoSupported) {
          parts.push(node.value);
        } else {
          const result = parseUnit(node.value);

          // when unit isn't specified this condition is true
          if (result && BOX_MODEL_UNITS.includes(result.unit)) {
            parts.push(node.value);
          } else {
            logError(model, value);

            return {} as E;
          }
        }
      }
    }

    // // checks that we have enough parsed values
    if (parts.length > maxValues) {
      logError(model, value);

      return {} as E;
    }

    const first = parts[0];

    if (expandsTo) {
      const second = parts[1] || parts[0];
      const third = parts[2] || parts[0];
      const fourth = parts[3] || parts[1] || parts[0];

      return expandsTo({ first, second, third, fourth });
    }

    return {
      [model]: first,
    } as E;
  };

export default expandBoxModel;
