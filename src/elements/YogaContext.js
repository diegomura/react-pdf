import React from 'react';

const YogaContext = React.createContext();

export default YogaContext;

export function provideYoga(Yoga, children) {
  return React.createElement(
    YogaContext.Provider,
    {
      value: Yoga,
    },
    children,
  );
}
