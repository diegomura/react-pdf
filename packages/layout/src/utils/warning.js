function printWarning(format, ...args) {
  let argIndex = 0;
  const message = 'Warning: ' + format.replace(/%s/g, () => args[argIndex++]);

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}
}

const __DEV__ = process.env.NODE_ENV !== 'production';

const warning = __DEV__
  ? (condition, format, ...args) => {
      if (format === undefined) {
        throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
            'message argument',
        );
      }
      if (!condition) {
        printWarning(format, ...args);
      }
    }
  : () => {};

export default warning;
