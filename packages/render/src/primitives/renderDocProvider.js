const renderDocProvider = (ctx, node) => {
  const fn = node?.props?.fn;
  if (typeof fn === 'function') {
    fn(ctx);
  }
};

export default renderDocProvider;
