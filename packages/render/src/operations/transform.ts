import { SafeNode } from '@react-pdf/layout';
import { Transform } from '@react-pdf/stylesheet';

import { Context } from '../types';

const applySingleTransformation = (
  ctx: Context,
  transform: Transform,
  origin: number[],
) => {
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
      const [x, y = 0] = value;
      ctx.translate(x, y, { origin });
      break;
    }

    case 'skew': {
      const [xAngle = 0, yAngle = 0] = value;
      const radx = (xAngle * Math.PI) / 180;
      const rady = (yAngle * Math.PI) / 180;
      const tanx = Math.tan(radx);
      const tany = Math.tan(rady);

      let x = 0;
      let y = 0;

      if (origin != null) {
        [x, y] = Array.from(origin);
        const x1 = x + tanx * y;
        const y1 = y + tany * x;
        x -= x1;
        y -= y1;
      }

      ctx.transform(1, tany, tanx, 1, x, y);
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

const applyTransformations = (ctx: Context, node: SafeNode) => {
  if (!node.origin) return;

  const { props, style } = node;
  const origin = [node.origin.left, node.origin.top];
  const propsTransform = 'transform' in props ? props.transform : undefined;
  const operations = style?.transform || propsTransform || [];

  operations.forEach((operation) => {
    applySingleTransformation(ctx, operation, origin);
  });
};

export default applyTransformations;
