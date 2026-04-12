import React from 'react';
import {
  Svg,
  Defs,
  Marker,
  Path,
  Line,
  Polyline,
  Circle,
  Polygon,
} from '@react-pdf/renderer';

// Arrowhead marker on a line
const ArrowLine = () => (
  <Svg width={200} height={60} viewBox="0 0 200 60">
    <Defs>
      <Marker
        id="arrowhead"
        markerWidth={10}
        markerHeight={7}
        refX={10}
        refY={3.5}
        orient="auto"
      >
        <Polygon points="0 0, 10 3.5, 0 7" fill="#333" />
      </Marker>
    </Defs>
    <Line
      x1={10}
      y1={30}
      x2={170}
      y2={30}
      stroke="#333"
      strokeWidth={2}
      markerEnd="url(#arrowhead)"
    />
  </Svg>
);

// Dot markers on polyline vertices
const DotPolyline = () => (
  <Svg width={200} height={80} viewBox="0 0 200 80">
    <Defs>
      <Marker
        id="dot"
        markerWidth={8}
        markerHeight={8}
        refX={4}
        refY={4}
        markerUnits="userSpaceOnUse"
      >
        <Circle cx={4} cy={4} r={3} fill="#e74c3c" />
      </Marker>
    </Defs>
    <Polyline
      points="20,60 50,20 80,50 110,15 140,45 170,10"
      fill="none"
      stroke="#3498db"
      strokeWidth={2}
      markerStart="url(#dot)"
      markerMid="url(#dot)"
      markerEnd="url(#dot)"
    />
  </Svg>
);

// Auto-orient markers on a curved path
const CurvedPath = () => (
  <Svg width={200} height={100} viewBox="0 0 200 100">
    <Defs>
      <Marker
        id="arrow-auto"
        markerWidth={10}
        markerHeight={6}
        refX={5}
        refY={3}
        orient="auto"
      >
        <Path d="M0,0 L10,3 L0,6 Z" fill="#2ecc71" />
      </Marker>
    </Defs>
    <Path
      d="M10,50 C40,10 80,90 120,50 C140,30 160,70 190,50"
      fill="none"
      stroke="#2ecc71"
      strokeWidth={2}
      markerStart="url(#arrow-auto)"
      markerMid="url(#arrow-auto)"
      markerEnd="url(#arrow-auto)"
    />
  </Svg>
);

// Double-headed arrow using auto-start-reverse
const DoubleArrow = () => (
  <Svg width={200} height={60} viewBox="0 0 200 60">
    <Defs>
      <Marker
        id="arrow-reverse"
        markerWidth={10}
        markerHeight={7}
        refX={10}
        refY={3.5}
        orient="auto-start-reverse"
      >
        <Polygon points="0 0, 10 3.5, 0 7" fill="#9b59b6" />
      </Marker>
    </Defs>
    <Line
      x1={20}
      y1={30}
      x2={180}
      y2={30}
      stroke="#9b59b6"
      strokeWidth={2}
      markerStart="url(#arrow-reverse)"
      markerEnd="url(#arrow-reverse)"
    />
  </Svg>
);

const Markers = () => (
  <>
    <ArrowLine />
    <DotPolyline />
    <CurvedPath />
    <DoubleArrow />
  </>
);

export default Markers;
