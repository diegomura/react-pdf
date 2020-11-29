import React from 'react';
import { Svg, G, Text, Tspan } from '@react-pdf/renderer';

const Svg5 = () => (
  <Svg width="600" height="400" viewBox="0 0 600 400">
    <G visibility="visible" transform="translate(0,10) scale(1 1)">
      <G transform="translate(391,223)">
        <Text x="5" y="16">
          <Tspan
            x="5"
            y="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinejoin="round"
          >
            -13.98%
          </Tspan>
          <Tspan x="5" y="16">
            -13.98%
          </Tspan>
        </Text>
      </G>
      <G transform="translate(511,304)">
        <Text x="5" y="16">
          <Tspan
            x="5"
            y="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinejoin="round"
          >
            -29.97%
          </Tspan>
          <Tspan x="5" y="16">
            -29.97%
          </Tspan>
        </Text>
      </G>
    </G>
  </Svg>
);

export default Svg5;
