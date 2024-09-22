/* eslint-disable import/prefer-default-export */

import { loadYoga as yogaLoadYoga } from 'yoga-layout/load';

let instance;

export const loadYoga = async () => {
  if (!instance) {
    // Yoga WASM binaries must be asynchronously compiled and loaded
    // to prevent Event emitter memory leak warnings, Yoga must be loaded only once
    instance = await yogaLoadYoga();
  }

  const config = instance.Config.create();

  config.setPointScaleFactor(0);

  const node = { create: () => instance.Node.createWithConfig(config) };

  return { node };
};
