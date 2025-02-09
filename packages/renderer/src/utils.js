/* eslint-disable import/prefer-default-export */

export const omitNils = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  );

export const capitalize = (v) => v[0].toUpperCase() + v.slice(1);
