import parse from 'postcss-value-parser/lib/parse';
import parseUnit from 'postcss-value-parser/lib/unit';

const BOX_MODEL_UNITS = 'px,in,mm,cm,pt,%,vw,vh';

const expandBoxModel = ({
  expandsTo,
  maxValues = 1,
  autoSupported = false,
} = {}) => (key, value) => {
  const nodes = parse(`${value}`);

  if (nodes.some(node => node.type === 'function')) {
    // value contains `calc`, `url` or other css function

    console.error('x');

    return {};
  }

  if (nodes.some(node => node.type === 'string' || node.type === 'div')) {
    // value contains `,`, `/` or strings
    console.error('x');

    return {};
  }

  const parts = nodes
    .filter(node => node.type === 'word')
    .map(word => ({
      raw: word.value,
      parsed: parseUnit(word.value),
    }));

  if (parts.length > maxValues) {
    console.error('x');

    return {};
  }

  const allPartsValid = parts.every(part => {
    if (!part.parsed && part.raw === 'auto' && autoSupported) {
      return true;
    }

    if (part.parsed && BOX_MODEL_UNITS.includes(part.parsed.unit)) {
      return true;
    }

    return false;
  });

  if (!allPartsValid) {
    console.error('x');

    return {};
  }

  const match = parts.map(part => part.raw);

  const first = match[0];

  if (expandsTo) {
    const second = match[1] || match[0];
    const third = match[2] || match[0];
    const fourth = match[3] || match[1] || match[0];
  
    return expandsTo({ first, second, third, fourth });
  }

  return {
    [key]: first,
  };
};

export default expandBoxModel;
