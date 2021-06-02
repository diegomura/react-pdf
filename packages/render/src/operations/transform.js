import * as R from 'ramda';

// TODO: Implement using only matrices to support skew and even more operations than css.

const parse = transformString => {
  const transforms = transformString.trim().split(/\) |\)/);
  // Handle "initial", "inherit", "unset".
  if (transforms.length === 1) {
    return [[transforms[0], true]];
  }

  const parsed = [];

  for (let i = 0; i < transforms.length; i += 1) {
    const transform = transforms[i];

    if (transform) {
      const [operationName, operationValueRaw] = transform.split('(');
      const values = operationValueRaw.split(',').map(val => val.trim());
      const value = values.length === 1 ? values[0] : values;
      parsed.push([operationName, value]);
    }
  }

  return parsed;
};

const applySingleTransformation = (ctx, operation, origin) => {
  const [name, args] = operation;

  switch (name) {
    case 'scale': {
      const [scaleX, scaleY] = args;
      ctx.scale(scaleX, scaleY, { origin });
      break;
    }

    case 'rotate': {
      ctx.rotate(args, { origin });
      break;
    }

    case 'translate': {
      const [x, y] = args;
      ctx.translate(x, y, { origin });
      break;
    }

    case 'matrix': {
      ctx.transform(...args);
      break;
    }

    default: {
      console.error(`Transform operation ${name} doesn't supported`);
    }
  }
};

const normalizeOperation = (operation, args) => {
  switch (operation) {
    case 'scale': {
      const isArray = Array.isArray(args);
      const parsed = isArray
        ? [Number.parseFloat(args[0]), Number.parseFloat(args[1])]
        : Number.parseFloat(args);
      const [scaleX, scaleY] = isArray ? parsed : [parsed, parsed];
      return ['scale', [scaleX, scaleY]];
    }

    case 'scaleX': {
      return ['scale', [Number.parseFloat(args), 1]];
    }
    case 'scaleY': {
      return ['scale', [1, Number.parseFloat(args)]];
    }

    case 'rotate': {
      const unitsRegexp = /(-?\d*\.?\d*)(\w*)?/i;
      const [, value, unit] = unitsRegexp.exec(args);
      const number = Number.parseFloat(value);

      return ['rotate', unit === 'rad' ? (number * 180) / Math.PI : number];
    }

    case 'translate': {
      return [
        'translate',
        [Number.parseFloat(args[0]), Number.parseFloat(args[1])],
      ];
    }

    case 'translateX': {
      return ['translate', [Number.parseFloat(args), 0]];
    }

    case 'translateY': {
      return ['translate', [0, Number.parseFloat(args)]];
    }

    default: {
      return [operation, args.map(num => Number.parseFloat(num))];
    }
  }
};

const normalize = operations => {
  const normalized = [];
  operations.forEach(([operation, args]) => {
    normalized.push(normalizeOperation(operation, args));
  });

  return normalized;
};

const applyTransformations = (ctx, node) => {
  if (!node.origin) return node;

  const origin = [node.origin.left, node.origin.top];
  const transform =
    (node.style && node.style.transform) ||
    (node.props && node.props.transform) ||
    '';
  const operations = normalize(parse(transform));

  operations.forEach(operation => {
    applySingleTransformation(ctx, operation, origin);
  });

  return node;
};

export { parse as parseTransform, normalize as normalizeTransform };
export default R.curryN(2, applyTransformations);
