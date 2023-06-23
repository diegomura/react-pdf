import React from 'react';
import {
  Svg,
  Stop,
  Defs,
  Circle,
  LinearGradient,
  RadialGradient,
} from '@nutshelllabs/renderer';

const Svg4 = () => (
  <Svg viewBox="0 0 10 20" width="170">
    <Defs>
      <LinearGradient id="myLinearGradient">
        <Stop offset="5%" stopColor="gold" />
        <Stop offset="95%" stopColor="red" />
      </LinearGradient>

      <RadialGradient id="myRadialGradient">
        <Stop offset="10%" stopColor="gold" />
        <Stop offset="95%" stopColor="red" />
      </RadialGradient>
    </Defs>

    <Circle cx="5" cy="5" r="4" fill="url('#myLinearGradient')" />
    <Circle cx="5" cy="14" r="4" fill="url('#myRadialGradient')" />
  </Svg>
);

export default Svg4;
