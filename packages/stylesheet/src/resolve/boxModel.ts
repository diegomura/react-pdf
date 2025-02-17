import parse from 'postcss-value-parser/lib/parse.js';
import parseUnit from 'postcss-value-parser/lib/unit.js';
import transformUnit from '../utils/units';
import { Container } from '../types';

const BOX_MODEL_UNITS = 'px,in,mm,cm,pt,%,vw,vh';

interface ParseValue {
  type: string;
  value: string;
}

const logError = (style: any, value: any) => {
  const name = style.toString();

  // eslint-disable-next-line no-console
  console.error(`
    @react-pdf/stylesheet parsing error:
    ${name}: ${value},
    ${' '.repeat(name.length + 2)}^
    Unsupported ${name} value format
  `);
};

/**
 * @param {Object} options
 * @param {Function} [options.expandsTo]
 * @param {number} [options.maxValues]
 * @param {boolean} [options.autoSupported]
 */
const expandBoxModel =
  <S, E>({
    expandsTo,
    maxValues = 1,
    autoSupported = false,
  }: {
    expandsTo?: ({ first, second, third, fourth }: Record<string, number>) => E;
    maxValues?: number;
    autoSupported?: boolean;
  } = {}) =>
  <K extends keyof S>(model: K, value: S[K], container: Container) => {
    const nodes: ParseValue[] = parse(`${value}`);

    const parts: string[] = [];

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

    // checks that we have enough parsed values
    if (parts.length > maxValues) {
      logError(model, value);

      return {} as E;
    }

    const first = transformUnit(container, parts[0]) as number;

    if (expandsTo) {
      const second = transformUnit(container, parts[1] || parts[0]) as number;
      const third = transformUnit(container, parts[2] || parts[0]) as number;
      const fourth = transformUnit(
        container,
        parts[3] || parts[1] || parts[0],
      ) as number;

      return expandsTo({ first, second, third, fourth });
    }

    return {
      [model]: first,
    } as E;
  };

export default expandBoxModel;
