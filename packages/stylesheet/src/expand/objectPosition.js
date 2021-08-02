const expandObjectPosition = (key, value) => {
  const match = `${value}`.split(' ');

  return {
    objectPositionX: match?.[0] || value,
    objectPositionY: match?.[1] || value,
  };
};

export default expandObjectPosition;
