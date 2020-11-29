import React from 'react';
import { SvgChart } from './SvgChart';

const svg = `
<svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
     <g transform="translate(0,10) scale(1 1)">
        <g transform="translate(391,223)">
            <text x="5" y="16">
                <tspan x="5" y="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round">-13.98%</tspan><tspan x="5" y="16">-13.98%</tspan>
            </text>
        </g>
        <g transform="translate(511,304)">
            <text x="5" y="16">
                <tspan x="5" y="16" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round">-29.97%</tspan><tspan x="5" y="16">-29.97%</tspan>
            </text>
        </g>
    </g>
</svg>
`;

const SvgString = () => {
  return <SvgChart svg={svg} />;
};

export default SvgString;
