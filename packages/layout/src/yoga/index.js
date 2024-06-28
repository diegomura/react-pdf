/* eslint-disable import/prefer-default-export */

import { loadYoga as yogaLoadYoga } from 'yoga-layout/load';

export const loadYoga = async () => {
  const instance = await yogaLoadYoga();
  const config = instance.Config.create();

  config.setPointScaleFactor(0);

  const node = { create: () => instance.Node.createWithConfig(config) };

  return { node };
};
