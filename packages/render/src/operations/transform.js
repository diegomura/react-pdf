import * as R from 'ramda';

// TODO: Implement using only matrices to support skew and even more operations than css.

const getRotation = transform => {
  const match = /rotate\((-?\d+(.\d+)?)(.+)\)/g.exec(transform);

  if (match && match[1] && match[3]) {
    const value = match[1];
    return match[3] === 'rad' ? (value * 180) / Math.PI : value;
  }

  return 0;
};

const getTranslateX = transform => {
  const matchX = /translateX\((-?\d+\.?d*)\)/g.exec(transform);
  const matchGeneric = /translate\((-?\d+\.?d*).*(,|\s)\s*(-?\d+\.?d*).*\)/g.exec(
    transform,
  );

  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];

  return 0;
};

const getTranslateY = transform => {
  const matchY = /translateY\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /translate\((-?\d+\.?\d*).*(,|\s)\s*(-?\d+\.?\d*).*\)/g.exec(
    transform,
  );

  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[3]) return matchGeneric[3];

  return 0;
};

const getScaleX = transform => {
  const matchX = /scaleX\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /scale\((-?\d+\.?\d*).*,?\s*(-?\d+\.?\d*).*\)/g.exec(
    transform,
  );

  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];

  return 1;
};

const getScaleY = transform => {
  const matchY = /scaleY\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /scale\((-?\d+\.?\d*).*,?\s*(-?\d+\.?\d*).*\)/g.exec(
    transform,
  );

  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[2]) return matchGeneric[2];

  return 1;
};

const getMatrix = transform => {
  const match = /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/g.exec(
    transform,
  );
  if (match) return match.slice(1, 7);
  return null;
};

const applySingleTransformation = (ctx, transform, origin) => {
  if (/rotate/g.test(transform)) {
    ctx.rotate(getRotation(transform), { origin });
  } else if (/scaleX/g.test(transform)) {
    ctx.scale(getScaleX(transform), 1, { origin });
  } else if (/scaleY/g.test(transform)) {
    ctx.scale(1, getScaleY(transform), { origin });
  } else if (/scale/g.test(transform)) {
    ctx.scale(getScaleX(transform), getScaleY(transform), {
      origin,
    });
  } else if (/translateX/g.test(transform)) {
    ctx.translate(getTranslateX(transform), 1, { origin });
  } else if (/translateY/g.test(transform)) {
    ctx.translate(1, getTranslateY(transform), { origin });
  } else if (/translate/g.test(transform)) {
    ctx.translate(getTranslateX(transform), getTranslateY(transform), {
      origin,
    });
  } else if (/matrix/g.test(transform)) {
    ctx.transform(...getMatrix(transform));
  }
};

const applyTransformations = (ctx, node) => {
  if (!node.origin) return node;

  let match;
  const re = /[a-zA-Z]+\([^)]+\)/g;
  const origin = [node.origin.left, node.origin.top];
  const transform =
    (node.style && node.style.transform) ||
    (node.props && node.props.transform) ||
    '';

  while ((match = re.exec(transform)) != null) {
    applySingleTransformation(ctx, match[0], origin);
  }

  return node;
};

export default R.curryN(2, applyTransformations);
