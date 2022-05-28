/**
 * Check if two rect are equal
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} rects are equal
 *
 */
const equals = (a, b) => {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
};

export default equals;
