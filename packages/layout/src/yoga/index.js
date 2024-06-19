/* eslint-disable import/prefer-default-export */

import Yoga from 'yoga-layout';

export const loadYoga = () => {
  const config = Yoga.Config.create();

  config.setPointScaleFactor(0);

  const node = { create: () => Yoga.Node.createWithConfig(config) };

  return { node };
};
