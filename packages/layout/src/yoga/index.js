/* eslint-disable import/prefer-default-export */

import * as Yoga from 'yoga-layout';

export const loadYoga = async () => {
  const instance = await Yoga.loadYoga();
  const config = instance.Config.create();

  config.setPointScaleFactor(0);

  const node = { create: () => instance.Node.createWithConfig(config) };

  return { node };
};
