// TODO: Implement using only matrices to support skew and even more operations than css.

const applySingleTransformation = (ctx, transform, origin) => {
  const { operation, value } = transform;

  switch (operation) {
    case 'scale': {
      const [scaleX, scaleY] = value;
      ctx.scale(scaleX, scaleY, { origin });
      break;
    }

    case 'rotate': {
      const [angle] = value;
      ctx.rotate(angle, { origin });
      break;
    }

    case 'translate': {
      const [x, y] = value;
      ctx.translate(x, y, { origin });
      break;
    }

    case 'matrix': {
      ctx.transform(...value);
      break;
    }

    default: {
      console.error(`Transform operation: '${operation}' doesn't supported`);
    }
  }
};

const applyTransformations = (ctx, node) => {
  if (!node.origin) return;

  const origin = [node.origin.left, node.origin.top];
  const operations = node.style?.transform || node.props?.transform || [];

  operations.forEach(operation => {
    applySingleTransformation(ctx, operation, origin);
  });
};

export default applyTransformations;
